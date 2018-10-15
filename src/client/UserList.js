import React, { Component } from "react";
class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userList = this.props.users.map((user, i) => (
      <li className={user.it ? "user-is-it" : undefined} key={i}>
        {user.username}{' ['}{user.points}{']'}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Players</h3>
          <ul>{userList}</ul>
        </div>
      </div>
    );
  }
}

export default UserList;
