import React, { Component } from "react";

class WritePlot extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.props.socket.on("USERS", function(data) {
    //   console.log("USERS!");
    //   updateUsers(data.users);
    // });

    // this.props.socket.on("FILM_PICKED", function(data) {
    //   updateTitle(data.title);
    // });

    // this.handleSubmit = e => {
    //   e.preventDefault();
    //   this.props.socket.emit("PICK_FILM", {
    //     title: "Open Your Eyes",
    //     plot:
    //       "A flamboyant optometrist resigned to a life of solitude re-encounters an old flame in a hot tub."
    //   });
    // };

    // const updateTitle = title => {
    //   this.state.filmPicked = title;
    // };

    // const updateUsers = data => {
    //   this.setState({
    //     users: data
    //   });
    // };
  }

  render() {
    const {iAmIt, it, title} = this.props;
    const PlotForm = () => (
      <div>
        <h2 className="text-center">{title}</h2>
        <textarea name="" id="" />
        <button
          onClick={this.props.handlePickFilm}
          className="btn btn-primary form-control"
        >
          Submit
        </button>
      </div>
    );

    const Waiting = () => <p className="text-center">Waiting for opponents to write their plots</p>;

    return (
      <div className="row">
        <div className="col-xs-12">
          {iAmIt ? <Waiting /> : <PlotForm />}
        </div>
      </div>
    );
  }
}

export default WritePlot;
