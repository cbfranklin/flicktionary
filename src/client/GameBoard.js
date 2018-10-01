import React, { Component } from "react";
import PickFilm from "./PickFilm";
import WritePlot from "./WritePlot";
import SocketContext from "./SocketContext";

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filmPicked: false
    };

    this.props.socket.on("FILM_PICKED", function(data) {
      console.log("FILM PICKED!");
      filmPicked(data.title);
    });

    const filmPicked = title => {
      this.setState({
        filmPicked: title
      });
    };
  }

  render() {
    return this.state.filmPicked ? <WritePlot /> : <PickFilm />;
  }
}

const GameBoardWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <GameBoard {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default GameBoardWithSocket;
