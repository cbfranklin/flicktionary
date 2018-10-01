import React, { Component } from "react";
import SocketContext from "./SocketContext";

class PickFilm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.props.socket.on("USERS", function (data) {
            console.log("USERS!");
            updateUsers(data.users);
        });

        this.handlePickFilm = e => {
            e.preventDefault();
            this.props.socket.emit("PICK_FILM", {
                title: 'Open Your Eyes',
                plot: 'A flamboyant optometrist resigned to a life of solitude re-encounters an old flame in a hot tub.'
            });
        };

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
            onClick={this.handlePickFilm}
            className="btn btn-primary form-control">
            Pick the demo film
        </button>;

        const Waiting = () => <p>Waiting for {this.state.itsName} to pick a film</p>;

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

const PickFilmWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <PickFilm {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default PickFilmWithSocket;
