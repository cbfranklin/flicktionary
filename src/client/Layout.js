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
              <a
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </a>
              <a className="brand" href="#">
                Flicktionary
              </a>
            </div>
          </div>
        </div>

        <GameBoard />
      </div>
    );
  }
}

export default Layout;
