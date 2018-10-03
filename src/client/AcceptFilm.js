import React, { Component } from "react";

class AcceptFilm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt, title, filmAccepted } = this.props;
    const StartButton = () => (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h4 >{this.props.it} proposes the film:</h4>
            <h2 >{title}</h2>
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
      <p >
            Waiting for opponents to accept <strong>{title}</strong>
      </p>
    );

    return (
      <div className="row">
        <div className="col-xs-12">{iAmIt || filmAccepted ? <Waiting /> : <StartButton />}</div>
      </div>
    );
  }
}

export default AcceptFilm;
