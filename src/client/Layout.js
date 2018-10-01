import React, { Component } from "react";
import Users from "./Users";
import SetUsername from "./SetUsername";
import PickFilm from "./PickFilm";
class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SetUsername />
        <Users />
        <PickFilm/>
      </div>
    );
  }
}

export default Layout;
