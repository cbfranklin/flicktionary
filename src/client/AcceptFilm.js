import React, { Component } from "react";

class AcceptFilm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    }
  render() {
    const { it, iAmIt, title} = this.props;
    const StartButton = () => (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h2>{this.props.it} proposes the film</h2>
            <h3>{title}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              onClick={this.props.handleAcceptFilm}
              className="btn btn-primary form-control"
              value="accept"
            >
              Never heard of it
            </button>
          </div>
          <div className="col-md-6">
            <button
              onClick={this.props.handleAcceptFilm}
              className="btn btn-default form-control"
              value="deny"
            >
              I know this film
            </button>
          </div>
        </div>
      </div>
    );

    const Waiting = () => (
      <div>
        <h2>Waiting for others to accept the film</h2>
        <h3>{title}</h3>
      </div>
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          {iAmIt || this.props.filmAccepted === title ? <Waiting /> : <StartButton />}
        </div>
      </div>
    );
  }
}

export default AcceptFilm;
