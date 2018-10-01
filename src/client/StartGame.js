import React, { Component } from "react";
import SocketContext from "./SocketContext";

class StartGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.props.socket.on("USERS", function (data) {
            console.log("USERS!");
            updateUsers(data.users);
        });

        const updateUsers = data => {
            this.setState({
                users: data
            });
            const userIndex = this.state.users.findIndex(user => user.it === true);
            this.setState({
                itsName: this.state.users[userIndex].username
            })
            if(this.state.users[userIndex].id === this.props.socket.id){
                this.setState({
                    it: true
                })
            }
        };
    }

    render() {
        const StartButton = () =>
        <button
            onClick={this.setUsername}
            className="btn btn-primary form-control">
            Start
        </button>;

        const Waiting = () => <p>Waiting for {this.state.itsName} to start the game</p>;

        return (
            <section className="username">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            {this.state.it ? <StartButton/> : <Waiting/>}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const StartGameWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <StartGame {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default StartGameWithSocket;
