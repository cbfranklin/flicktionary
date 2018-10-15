import React, { Component } from "react";
import GameBoard from "./GameBoard";
class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-inverse">
          <div className="navbar-inner">
            <div className="container">
              <h1 className="brand" href="#">
                Flicktionary
              </h1>
            </div>
          </div>
        </div>

        <GameBoard />
      </div>
    );
  }
}

export default Layout;
