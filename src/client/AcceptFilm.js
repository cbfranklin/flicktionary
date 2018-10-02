import React, { Component } from "react";

class AcceptFilm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt, title } = this.props;
    const StartButton = () => (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h4 className="text-center">{this.props.it} proposes the film:</h4>
            <h2 className="text-center">{title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              onClick={this.props.handleAcceptFilm}
              className="btn btn-success form-control"
              value="accept"
            >
              Never heard of it
            </button>
          </div>
          <div className="col-md-6">
            <button
              onClick={this.props.handleAcceptFilm}
              className="btn btn-danger form-control"
              value="deny"
            >
              I know this film
            </button>
          </div>
        </div>
      </div>
    );

    const Waiting = () => (
      <p className="text-center">
            Waiting for opponents to accept <strong>{title}</strong>
      </p>
    );

    return (
      <div className="row">
        <div className="col-xs-12">{iAmIt ? <Waiting /> : <StartButton />}</div>
      </div>
    );
  }
}

export default AcceptFilm;
