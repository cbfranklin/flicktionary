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
              <p className="brand" href="#">
                Flicktionary
              </p>
            </div>
          </div>
        </div>

        <GameBoard />
      </div>
    );
  }
}

export default Layout;
