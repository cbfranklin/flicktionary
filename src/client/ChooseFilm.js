import React, { Component } from "react";

class ChooseFilm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt } = this.props;
    const StartButton = () => (
      <div>
        <h2 className="text-center">Choose a film</h2>
        <button
          onClick={this.props.handleChooseFilm}
          className="btn btn-primary form-control"
        >
          Choose the demo film
        </button>
      </div>
    );

    const Waiting = () => (
      <p className="text-center">
        Waiting for <strong>{it}</strong> to choose a film
      </p>
    );

    return (
      <div className="row">
        <div className="col-xs-12">{iAmIt ? <StartButton /> : <Waiting />}</div>
      </div>
    );
  }
}

export default ChooseFilm;
