import React, { Component } from "react";

class VoteForPlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voted: false
    };
  }

  render() {
    const { it, iAmIt, plots, handleVotePlot, plotVoted } = this.props;
    const Plots = () => {
      return (
        <ul>
          {plots.map((plot, i) => (
            <li key={i}>
              <button
                onClick={handleVotePlot}
                value={i}
                className="btn btn-success"
              >
                Vote
              </button>{" "}
              {plot.text}
            </li>
          ))}
        </ul>
      );
    };
    const Vote = () => (
      <div>
        <h2 className="text-center">Choose a plot</h2>
        <Plots />
      </div>
    );

    const Waiting = () => (
      <p className="text-center">Waiting for opponents to vote</p>
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
