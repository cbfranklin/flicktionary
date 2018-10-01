import React, { Component } from "react";
import Users from "./Users";
import SetUsername from "./SetUsername";
import GameBoard from "./GameBoard";
class Layout extends Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <SetUsername />
              </div>
              <div className="col-sm-6">
                <Users />
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <GameBoard />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// const LayoutWithSocket = props => (
//   <SocketContext.Consumer>
//     {socket => <Layout {...props} socket={socket} />}
//   </SocketContext.Consumer>
// );


// export default LayoutWithSocket;
export default Layout;
