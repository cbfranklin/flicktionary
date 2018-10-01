import React, { Component } from "react";
import SocketContext from "./SocketContext";
class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.props.socket.on("USERS", function(data) {
      console.log("USERS!");
      updateUsers(data.users);
    });

    const updateUsers = data => {
      this.setState({
        users: data
      });
    };
  }

  render() {
    const userList = this.state.users.map((user, i) => (
      <li className={user.it && "user-is-it"} key={i}>
        {user.username}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Players</h3>
          <ul className="list-pipe">{userList}</ul>
        </div>
      </div>
    );
  }
}

const UsersWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Users {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default UsersWithSocket;
