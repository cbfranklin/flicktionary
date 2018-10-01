import React, { Component } from "react";
import SocketContext from "./SocketContext";
class SetUsername extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.setUsername = e => {
      e.preventDefault();
      this.props.socket.emit("SET_USERNAME", {
        username: this.state.username
      });
    };
  }

  render() {
    return (
      <section className="username">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                className="form-control"
              />
              <button
                onClick={this.setUsername}
                className="btn btn-primary form-control"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const SetUsernameWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <SetUsername {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default SetUsernameWithSocket;
