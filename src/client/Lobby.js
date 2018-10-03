import React, { Component } from "react";
import UserList from "./UserList";
class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users, iAmIt, it, handleStartGame } = this.props;
    console.log({ iAmIt });
    const StartGame = () => {
      if (users.length > 2) {
        if (iAmIt) {
          return (
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={this.props.handleStartGame}
            >
              Start
            </button>
          );
        } else {
          return (
            <div className="alert alert-info">
              Waiting for <em>{it}</em> to start the game
            </div>
          );
        }
      } else {
        return <div className="alert alert-info">{"Waiting for more users to join"}</div>;
      }
    };
    return (
      <div>
        <h2>Lobby</h2>
        <UserList users={users} />
        <StartGame />
      </div>
    );
  }
}

export default Lobby;
