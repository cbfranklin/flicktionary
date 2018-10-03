import React, { Component } from "react";
import UserList from "./UserList";
class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users, iAmIt, it, handleStartGame, myUserIndex } = this.props;
    console.log({ iAmIt });
    const StartGame = () => {
      if (users.length > 2) {
        if (iAmIt) {
          return (
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={handleStartGame}
            >
              Start
            </button>
          );
        } else {
          return (
            <div className="alert alert-info">
              Waiting for <em>{it}</em> to start the round
            </div>
          );
        }
      } else {
        return (
          <div className="alert alert-info">
            {"Waiting for more users to join"}
          </div>
        );
      }
    };
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h2>Greetings, {users[myUserIndex].username}!</h2>
              <p>
                Flicktionary is like Dictionary (Balderdash), except with film
                plots instead of word definitions!
              </p>
              <StartGame />
            </div>
            <div className="col-sm-6">
              <UserList users={users} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Lobby;
