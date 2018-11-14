const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");

const filmsPath = path.join(__dirname, "plots.json");
console.log(filmsPath)
const films = JSON.parse(fs.readFileSync(filmsPath, "utf8"));

const randomFilm = () => {
  console.log(films[Math.floor(Math.random() * films.length)]);
  return films[Math.floor(Math.random() * films.length)];
};

const game = {
  users: [],
  round: {
    stage: "lobby",
    title: null,
    accepts: [],
    plots: [],
    votes: [],
    inProgress: false,
    newUsersAllowed: true
  }
};

// React static site served at :3000
app.use(express.static("dist"));

// Socket server at :3001
server.listen(3001, () => console.log("Listening on port 3001!"));

// SOCKETS
// new player joins
io.on("connection", function(socket) {
  console.log("new connection");
  // add user to db
  game.users.push({
    username: "Friend",
    id: socket.id,
    points: 0
  });
  // set it
  setUserWhoIsIt();
  updateGameForAllUsers(socket);

  // on disconnect...
  socket.on("disconnect", function() {
    const disconnectIndex = userIndex(socket.id);
    // if disconnected user was "it", or no more users remain
    if (game.users[disconnectIndex].it === true || game.users.length === 0) {
      newRound(socket);
    }
    // if current stage is accept-film
    if (game.round.stage === "accept-film") {
      // if all remaining users have accepted
      if (
        game.round.accepts.length === game.users.length - 1 &&
        game.round.accepts.every(isTrue)
      ) {
        game.round.filmAccepted = true;
        game.round.stage = "write-plot";
      }
    }

    // remove user from db
    game.users.splice(disconnectIndex, 1);
    // update user list for all clients
    setUserWhoIsIt();
    updateGameForAllUsers(socket);
  });

  socket.on("username-set", function(data) {
    // update username in db
    userData(socket.id).username = data.username;
    updateGameForAllUsers(socket);
  });

  // set stage when directed by qualified client
  socket.on("stage-set", function(data) {
    game.round.stage = data.stage;
    console.log(data.stage);
    updateGameForAllUsers(socket);
  });

  socket.on("random-films-requested", function() {
    console.log("random-films-requested");
    const randomFilms = [
      randomFilm(),
      randomFilm(),
      randomFilm(),
      randomFilm(),
      randomFilm()
    ];
    console.log("random films");
    socket.emit("random-films", {
      randomFilms: randomFilms
    });
  });
  // IT has chosen a film
  socket.on("film-chosen", function(data) {
    const setPlot = () => {
      if (!data) {
        console.log("no data");
        newRound(socket);
      }
      game.round.newUsersAllowed = false;
      // new plot
      const plot = {
        text: data.plot,
        creator: socket.id,
        isReal: true,
        votes: 0
      };
      // remove all existing plots, push new plot
      game.round.title = data.title;
      game.round.plots = [plot];
    };

    if (data.plot) {
      setPlot();
      // set stage to accept-film
      game.round.stage = "accept-film";
      updateGameForAllUsers(socket);
    } else {
      newRound(socket);
    }
  });

  // IT has chosen a film
  socket.on("film-accepted", function(data) {
    // vote is true or false
    const accept = data.accept;
    console.log(`Film accepted? ${accept}`);
    if (accept === false) {
      //if anyone's seen it,
      // need to chose another film
      game.round.stage = "choose-film";
    } else {
      //push vote
      game.round.accepts.push(accept);
      // if all accepts are in and all accepts are true
      if (
        game.round.accepts.length === game.users.length - 1 &&
        game.round.accepts.every(isTrue)
      ) {
        game.round.filmAccepted = true;
        game.round.stage = "write-plot";
      }
    }
    updateGameForAllUsers(socket);
  });

  socket.on("plot-written", function(data) {
    const plot = {
      text: data.plot,
      creator: socket.id,
      isReal: false,
      votes: 0
    };

    game.round.plots.push(plot);
    shuffleArray(game.round.plots);
    if (game.round.plots.length === game.users.length) {
      game.round.stage = "vote-for-plot";
    }
    updateGameForAllUsers(socket);
  });

  socket.on("plot-voted", function(data) {
    const plotIndex = data.plot;
    console.log("plotIndex", plotIndex);
    voteForPlot(plotIndex);
    // if all votes are in, next stage!
    console.log("votes", game.round.votes, "users", game.users);
    if (game.round.votes.length === game.users.length - 1) {
      assignPlotVotesToUsers();
      game.round.stage = "results";
    }
    updateGameForAllUsers(socket);
  });

  socket.on("new-round", function(data) {
    newRound(socket);
  });
});

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

const newRound = socket => {
  game.round = templates.round;
  console.log("New Round: ", game.round);

  updateGameForAllUsers(socket);
};

const updateGameForAllUsers = socket => {
  socket.broadcast.emit("game-update", { game: game });
  socket.emit("game-update", { game: game });
};

const assignPlotVotesToUsers = () => {
  for (plot of game.round.plots) {
    // if it was the real plot and it got no votes, give creator 1 point per opponent
    if (plot.isReal && plot.votes === 0) {
      userData(plot.creator).points += game.users.length - 1;
    }
  }
  // if it was a fake plot, apply all votes to creator as points
  if (!plot.isReal) {
    userData(plot.creator).points += plot.votes;
  }
};

const userIndex = socketID => {
  return game.users.findIndex(user => user.id === socketID);
};

const userData = socketID => {
  const index = game.users.findIndex(user => user.id === socketID);
  return game.users[index];
};

const voteForPlot = index => {
  game.round.plots[index].votes++;
  game.round.votes.push(index);
};

const isTrue = item => {
  return item === true;
};

const setUserWhoIsIt = socket => {
  // if there are users at all
  if (game.users.length > 0) {
    // determine index of it
    const currentItIndex = game.users.findIndex(user => user.it === true);
    // if there are users but no it
    if (currentItIndex === -1) {
      // and we're in the Lobby
      if (game.round.stage === "lobby") {
        // first user in array is it
        game.users[0].it = true;
        return game.users[0].username;
      }
      // if a film has already been accepted
      else if (game.round.filmAccepted) {
        // don't set it until we're back in the lobby
        return false;
      }
      // film not accepted and it has left the game
      else {
        //back to the lobby
        newRound(socket);
      }
      // if there is already an it
    } else {
      game.users.forEach(user => {
        user.it = false;
      });
      let nextUser = game.users[currentItIndex + 1];
      if (nextUser) {
        nextUser.it = true;
      } else {
        game.users[0].it = true;
      }
    }
  }
  // if there are no players
  else {
    return false;
  }

  // // else
  // // newRound(socket);
  // // if there are users and and it
  //
  // // if there are users
  // if (game.users.length > 0) {
  //   const currentItIndex = game.users.findIndex(user => user.it === true);
  //   // if no user is currently it, player 1 is it
  //   if (currentItIndex === -1) {
  //     game.users[0].it = true;
  //     return true;
  //   } else {
  //     if (game.round.stage !== "lobby" && currentItIndex === -1) {
  //       // do nothing
  //     }
  //   }
  //   // if a player is currently it, iterate by 1
  //   let nextUser = game.users[currentItIndex + 1];
  //   if (nextUser) {
  //     nextUser.it = true;
  //   } else {
  //     game.users[0].it = true;
  //   }
  // }
};

const templates = {
  round: {
    stage: "lobby",
    title: null,
    accepts: [],
    votes: [],
    plots: []
  }
};
