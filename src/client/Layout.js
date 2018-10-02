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

// const LayoutWithSocket = props => (
//   <SocketContext.Consumer>
//     {socket => <Layout {...props} socket={socket} />}
//   </SocketContext.Consumer>
// );


// export default LayoutWithSocket;
export default Layout;
