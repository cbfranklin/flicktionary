const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const game = {
  users: [],
  round: {
    stage: "lobby",
    title: null,
    accepts: [],
    plots: []
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
    username: ragtimers[Math.floor(Math.random() * ragtimers.length)],
    id: socket.id,
    points: 0
  });
  // set it
  setInitialUserWhoIsIt();
  updateGameForAllUsers(socket);

  // on disconnect...
  socket.on("disconnect", function() {
    // remove user from db
    game.users.splice(userIndex(socket.id), 1);
    // update user list for all clients
    setInitialUserWhoIsIt();
    updateGameForAllUsers(socket);

    if (game.users.length === 0) {
      newRound(socket);
    }
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

  // IT has chosen a film
  socket.on("film-chosen", function(data) {
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
    // set stage to accept-film
    game.round.stage = "accept-film";
    updateGameForAllUsers(socket);
  });

  // IT has chosen a film
  socket.on("film-accepted", function(data) {
    // vote is true or false
    const accept = data.accept;
    console.log(`Film accepted: ${accept}`);
    if (accept === false) {
      // need to chose another film
      game.round.stage = "choose-film";
    } else {
      //push vote
      game.round.accepts.push(accept);
      // if all votes are in and all votes are true
      if (
        game.round.accepts.length === game.users.length - 1 &&
        game.round.accepts.every(isTrue)
      ) {
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
    voteForPlot(plotIndex);
    // if all votes are in, next stage!
    if (allVotesIn()) {
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
    if (plot.isReal && plot.votes === 0) {
      userData(plot.creator).points += plot.votes;
    }
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
};

const isTrue = item => {
  return item === true;
};

const setInitialUserWhoIsIt = () => {
  if (game.users.length > 0) {
    const currentItIndex = game.users.findIndex(user => user.it === true);
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
};

const templates = {
  round: {
    stage: "lobby",
    title: null,
    accepts: [],
    plots: []
  }
};

const allVotesIn = () => {
  let votes = 0;
  for (plot of game.round.plots) {
    votes += plot.votes;
  }
  if (votes === game.users.length - 1) {
    return true;
  } else {
    return false;
  }
};

const ragtimers = [
  "John Arpin",
  "Winifred Atwell",
  "Irving Berlin",
  "Mike Bernard",
  "Eubie Blake",
  "William Bolcom",
  "Lou Busch",
  "Jo Ann Castle",
  "Louis Chauvin",
  "Zez Confrey",
  "James Reese Europe",
  "William Ezell",
  "Blind Leroy Garnett",
  "Gene Greene",
  "Ben Harney",
  "Ernest Hogan",
  "Dick Hyman",
  "Tony Jackson",
  "James P. Johnson",
  "Scott Joplin",
  "Sue Keller",
  "Joseph Lamb",
  "George Lewis",
  "Johnny Maddox",
  "Bob Milne",
  "John Mooney",
  "Jelly Roll Morton",
  "Vess Ossman",
  "Harry Reser",
  "David Thomas Roberts",
  "Wally Rose",
  "Joshua Rifkin",
  "James Scott",
  "Muggsy Spanier",
  "Charley Straight",
  "Wilbur Sweatman",
  "Fred Van Eps",
  "Fats Waller",
  "Del Wood",
  "Dick Zimmerman",
  "Jelly Roll Morton"
];
