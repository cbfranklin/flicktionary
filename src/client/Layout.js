import React, { Component } from "react";
import Users from "./Users";
import SetUsername from "./SetUsername";
import StartGame from "./StartGame";
class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SetUsername />
        <Users />
        <StartGame/>
      </div>
    );
  }
}

export default Layout;
