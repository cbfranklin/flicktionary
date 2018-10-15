import React, { Component } from "react";

import io from "socket.io-client";
import Cookies from 'universal-cookie';

import ChooseFilm from "./ChooseFilm";
import AcceptFilm from "./AcceptFilm";
import WritePlot from "./WritePlot";
import UserList from "./UserList";
import NameEditor from "./NameEditor";
import Lobby from "./Lobby";
import VoteForPlot from "./VoteForPlot";
import Results from "./Results";
import NoConnection from "./loaders/NoConnection";
import NoComponent from "./loaders/NoComponent";

const gameStages = [
  "lobby",
  "choose-film",
  "accept-film",
  "write-plot",
  "vote-for-plot",
  "results",
];

const cookies = new Cookies();

const socket = io("localhost:3001");

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      myUserIndex: null,
      plot: "",
      plotVoted: false
    };

    this.handleChangePlot = this.handleChangePlot.bind(this);

    if (cookies.get("username")) {
      socket.emit("username-set", {
        username: cookies.get("username")
      });
    }
    socket.on("game-update", function(data) {
      updateGame(data.game, socket.id);
    });

    socket.on("random-films", function(data) {
      updateRandomFilms(data.randomFilms);
    });

    const updateGame = (game, socketID) => {
      const { users } = game
      const myUserIndex = users.findIndex(user => user.id === socketID);
      const itsUserIndex = users.findIndex(user => user.it === true);
      const updatedState = {
      	game,
      	myUserIndex,
      	itsUserIndex,
      }
      this.setState(updatedState, () => console.log(`Game updated`, this.state));
    };
    const updateRandomFilms = randomFilms => {
      this.setState(
        {
          randomFilms: randomFilms
        },
        () => console.log(`Set random films`, this.state.randomFilms)
      );
    };
  }

  handleStartGame() {
    socket.emit("stage-set", {
      stage: "choose-film"
    });
  };
  handleSubmitName = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (var [key, value] of formData.entries()) {
      if (key === "username") {
        console.log("username", value);
        socket.emit("username-set", {
          username: value
        });
        cookies.set("username", value, { path: "/" });
      }
    }
  };
  handleRandomFilmRequest = () => {
    socket.emit("random-films-requested");
  };
  handleChooseFilm = i => {
    // e.preventDefault();
    const film = this.state.randomFilms[i];
    socket.emit("film-chosen", film);
  };

  handleAcceptFilm = e => {
    e.preventDefault();
    const { title } = this.state.game.round
    const { value } = e.target
    const accepted = value === 'accept' ? true : false

    if (!accepted) {
      console.log("declined")
    } else {
      console.log("accepted")
    }

    this.setState({
      filmAccepted: title
      plotVoted: false
    });
    
    socket.emit("film-accepted", {
      accept: accepted
    });
  };

  handleChangePlot = e => {
    console.log("handleChangePlot", e.target.value);
    this.setState({
        plot: e.target.value
      },
      () => console.log(this.state.plot)
    );
  };
  
  handleSubmitPlot = e => {
    e.preventDefault();
    const { title } = this.state.game.round
    const formData = new FormData(e.target);
    this.setState({
      plotSubmitted: title
    });
    for (const [key, value] of formData.entries()) {
      if (key === "plot") {
        console.log("plot", value);
        socket.emit("plot-written", {
          plot: value
        });
      }
    }
  };

  handleVotePlot = e => {
    e.preventDefault();
    this.setState({
      plotVoted: true
    });
    socket.emit("plot-voted", {
      plot: e.target.value
    });
  }
  handleNewRound = () => {
    console.log("new round");
    socket.emit("new-round");
  }

  // this is my router, there are many like it but this one is mine
  renderStage = game => {
    const { round, users } = game
    const { plots, stage, title } = round
    const username = users[this.state.myUserIndex].username;
    const it = users[this.state.itsUserIndex].username;
    const iAmIt = users[this.state.myUserIndex].it;

    if (gameStages.indexOf(stage) < 0) {
      return <NoComponent />
    }
    
    if (stage === "lobby") {
      return (
        <Lobby
          users={users}
          iAmIt={iAmIt}
          it={it}
          handleStartGame={this.handleStartGame}
          myUserIndex={this.state.myUserIndex}
        />
      );
    } 
    
    if (stage === "choose-film") {
      return (
        <ChooseFilm
          it={it}
          iAmIt={iAmIt}
          handleChooseFilm={this.handleChooseFilm}
        />
      );
    } 
    
    if (stage === "accept-film") {
      return (
        <AcceptFilm
          it={it}
          iAmIt={iAmIt}
          handleAcceptFilm={this.handleAcceptFilm}
          title={title}
          filmAccepted={this.state.filmAccepted}
        />
      );
    } 
    
    if (stage === "write-plot") {
      return (
        <WritePlot
          it={it}
          iAmIt={iAmIt}
          title={title}
          handleSubmitPlot={this.handleSubmitPlot}
          handleChangePlot={this.handleChangePlot}
          plotSubmitted={this.state.plotSubmitted}
          plot={this.state.plot}
        />
      );
    } 
    
    if (stage === "vote-for-plot") {
      return (
        <VoteForPlot
          it={it}
          iAmIt={iAmIt}
          title={title}
          plots={plots}
          handleVotePlot={this.handleVotePlot}
          plotVoted={this.state.plotVoted}
        />
      );
    } 
    
    if (stage === "results") {
      return (
        <Results
          it={it}
          iAmIt={iAmIt}
          title={title}
          plots={plots}
          users={users}
          handleNewRound={this.handleNewRound}
        />
      );
    } 
  }

  render() {
    const game = this.state.game;
    // make sure socket is connected and game obj exists before rendering
    if (!game) {
      return <NoConnection />
    }
  
    const gameStage = this.renderStage(game)

    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                {gameStage}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default GameBoard;
