import React, { Component } from "react";

import io from "socket.io-client";

import ChooseFilm from "./ChooseFilm";
import AcceptFilm from "./AcceptFilm";
import WritePlot from "./WritePlot";
import UserList from "./UserList";
import SetUsername from "./SetUsername";
import Lobby from "./Lobby";

const socket = io("localhost:3001");

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      myUserIndex: null
    };

    socket.on("game-update", function(data) {
      updateGame(data.game, socket.id);
    });

    const updateGame = (game, socketID) => {
      const myUserIndex = game.users.findIndex(user => user.id === socketID);
      const itsUserIndex = game.users.findIndex(user => user.it === true);
      this.setState(
        {
          game: game,
          myUserIndex: myUserIndex,
          itsUserIndex: itsUserIndex
        },
        () => console.log(`Game updated`, this.state)
      );
    };
  }

  handleStartGame() {
    socket.emit("stage-set", {
      stage: "choose-film"
    });
  }
  handleChooseFilm = e => {
    e.preventDefault();
    socket.emit("film-chosen", {
      title: "Open Your Eyes",
      plot:
        "A flamboyant optometrist resigned to a life of solitude re-encounters an old flame in a hot tub."
    });
  };
  handleAcceptFilm = e => {
    e.preventDefault();
    let accepted;
    if (e.target.value === "accept") {
      accepted = true;
      console.log("accepted");
    } else {
      (accepted = false), console.log("declined");
    }
    socket.emit("film-accepted", {
      accept: accepted
    });
  };

  render() {
    const game = this.state.game;
    // make sure socket is connected and game obj exists before rendering
    if (game) {
      const username = game.users[this.state.myUserIndex].username;
      const it = game.users[this.state.itsUserIndex].username;
      const iAmIt = game.users[this.state.myUserIndex].it;
      // this is my router, there are many like it but this one is mine
      const Stage = () => {
        const stage = game.round.stage;
        if (stage === "lobby") {
          return (
            <Lobby
              users={game.users}
              iAmIt={iAmIt}
              it={it}
              handleStartGame={this.handleStartGame}
            />
          );
        } else if (stage === "choose-film") {
          return (
            <ChooseFilm
              it={it}
              iAmIt={iAmIt}
              handleChooseFilm={this.handleChooseFilm}
            />
          );
        } else if (stage === "accept-film") {
          return (
            <AcceptFilm
              it={it}
              iAmIt={iAmIt}
              handleAcceptFilm={this.handleAcceptFilm}
              title={game.round.title}
            />
          );
        } else if (stage === "write-plot") {
          return <WritePlot it={it} iAmIt={iAmIt} title={game.round.title} />;
        } else {
          return <div>No component for this stage...</div>;
        }
      };
      return (
        <div>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <SetUsername username={username} />
                </div>
                <div className="col-sm-6">
                  <UserList users={game.users} />
                </div>
              </div>
            </div>
          </section>
          <hr />
          <section>
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <Stage stage={game.round.stage} />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <div>Waiting for game...</div>;
    }
  }
}

export default GameBoard;
