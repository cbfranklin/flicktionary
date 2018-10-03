import React, { Component } from "react";

class VoteForPlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voted: false
    };
  }

  render() {
    const { it, iAmIt, plots, handleVotePlot, plotVoted, title } = this.props;
    const Plots = () => {
      return (
        <ul className="list-group">
          {plots.map((plot, i) => (
            <li className="list-group-item" key={i}>
              <h3>{i}</h3>
              <p>{plot.text}</p>
              <button
                onClick={handleVotePlot}
                value={i}
                className="btn btn-primary btn-block"
              >
                Vote{' '}[{i}]
              </button>
              <br/>
            </li>
          ))}
        </ul>
      );
    };
    const Vote = () => (
      <div>
        <h2>The title of the film is</h2>
        <h3>{title}</h3>
        <Plots />
      </div>
    );

    const Waiting = () => (
      <h2>Waiting for others to vote</h2>
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          {iAmIt || plotVoted === true ? <Waiting /> : <Vote />}
        </div>
      </div>
    );
  }
}

export default VoteForPlot;
