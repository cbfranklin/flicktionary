const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const game = {
  users: []
  //   sockets: []
};

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) => res.send({ username: "buttface" }));
server.listen(8080, () => console.log("Listening on port 8080!"));

io.on("connection", function(socket) {
  // add user to db
  game.users.push({
    username: `Player`,
    id: socket.id
  });

  setInitialUserWhoIsIt();
  // update user list for all clients
  console.table(game.users);
  socket.broadcast.emit("USERS", { users: game.users });
  socket.emit("USERS", { users: game.users });
  // on disconnect...
  socket.on("disconnect", function() {
    // remove user from db
    const userIndex = game.users.findIndex(user => user.id === socket.id);
    game.users.splice(userIndex, 1);
    // update user list for all clients
    setInitialUserWhoIsIt();
    socket.broadcast.emit("USERS", { users: game.users });
    socket.emit("USERS", { users: game.users });
  });

  socket.on("SET_USERNAME", function(data) {
    // update username in db
    const userIndex = game.users.findIndex(user => user.id === socket.id);
    game.users[userIndex].username = data.username;
    // update user list for all clients
    console.table(game.users);
    socket.broadcast.emit("USERS", { users: game.users });
    socket.emit("USERS", { users: game.users });
  });
});

const setInitialUserWhoIsIt = () => {
  if(game.users.length > 0){
      // first user to join is "it"
      for (user of game.users) {
          user.it = false;
      }
      game.users[0].it = true;
  }
};

// enter room, create user name
// USER NAME COMPONENT

// for each user in room

// pick IT

//IT propose film
//PICK A FILM COMPONENT

// each (except it) accept / decline
// ACCEPT/DECLINE COMPONENT

// if decline, back to propose ^

// if 100% accept:

// wait for all users (except IT) to submit plots
//SUBMIT PLOT COMPONENT

//show all plots, vote screen
// VOTE COMPONENT

// wait for all users (except IT) to vote

// tally votes, choose winner
// THE END COMPONENT
