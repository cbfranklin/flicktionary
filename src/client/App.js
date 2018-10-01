import React, { Component } from "react";
import io from "socket.io-client";
import SocketContext from "./SocketContext";
import Layout from "./Layout";

import "bootstrap3/dist/css/bootstrap.min.css";
import "./app.css";

const socket = io('localhost:8080');

const App = props => (
  <SocketContext.Provider value={socket}>
    <Layout/>
  </SocketContext.Provider>
);

export default App;
