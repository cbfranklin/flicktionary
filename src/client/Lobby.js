import React, { Component } from "react";
import UserList from "./UserList";
class Lobby extends Component {
  constructor(props) {
    super(props);
  }
  handleStartGame(){
      
  }

  render() {
    const {users, iAmIt, it, handleStartGame} = this.props;
    console.log({iAmIt})
    const StartGame = () => {
        if(iAmIt){
            return <button className="btn btn-primary btn-block" onClick={this.props.handleStartGame}>
                Start the game already!
              </button>;
        }
        else{
          return <p className="text-center">Waiting for <strong>{it}</strong> to start the game</p>
        }
    }
    return (
      <div>
        <h2>Lobby</h2>
        <UserList users={users} />
        <StartGame/>
      </div>
    );
  }
}

export default Lobby;
