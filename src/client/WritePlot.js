import React, { Component } from "react";
import SocketContext from "./SocketContext";

class WritePlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.props.socket.on("USERS", function(data) {
      console.log("USERS!");
      updateUsers(data.users);
    });

    this.props.socket.on("FILM_PICKED", function(data) {
      updateTitle(data.title);
    });

    this.handleSubmit = e => {
      e.preventDefault();
      this.props.socket.emit("PICK_FILM", {
        title: "Open Your Eyes",
        plot:
          "A flamboyant optometrist resigned to a life of solitude re-encounters an old flame in a hot tub."
      });
    };

    const updateTitle = title => {
      this.state.filmPicked = title;
    };

    const updateUsers = data => {
      this.setState({
        users: data
      });
      const userIndex = this.state.users.findIndex(user => user.it === true);
      this.setState({
        itsName: this.state.users[userIndex].username
      });
      if (this.state.users[userIndex].id === this.props.socket.id) {
        this.setState({
          it: true
        });
      }
    };
  }

  render() {
    const PlotForm = () => (
      <div>
        <h2>{this.state.filmPicked}</h2>
        <textarea name="" id="" />
        <button
          onClick={this.handlePickFilm}
          className="btn btn-primary form-control"
        >
          Submit
        </button>
      </div>
    );

    const Waiting = () => <p>Waiting for plots</p>;

    return (
      <div className="row">
        <div className="col-xs-12">
          {this.state.it ? <Waiting /> : <PlotForm />}
        </div>
      </div>
    );
  }
}

const WritePlotWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <WritePlot {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default WritePlotWithSocket;
