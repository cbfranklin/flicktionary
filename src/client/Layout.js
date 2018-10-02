import React, { Component } from "react";
import GameBoard from "./GameBoard";
class Layout extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <GameBoard />
    );
  }
}

export default Layout;
