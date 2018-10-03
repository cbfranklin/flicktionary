import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt, plots, handleVotePlot, plotVoted, users } = this.props;
    const getUserByID = id => {
      console.log(users);
      console.log(id);
      const index = users.findIndex(user => user.id === id);
      console.log(index);
      console.log(users[index]);
      return users[index];
    };
    const Plots = () => {
      return (
        <ul className="list-group">
          {plots.map((plot, i) => (
            <li className="list-group-item" key={i}>
              <ul class="list-group">
                <li className="list-group-item">
                  Votes
                  <span class="badge">{plot.votes}</span>
                </li>
                <li className="list-group-item">
                  Author
                  <span class="badge">
                    {getUserByID(plot.creator).username}
                  </span>
                </li>
                <br />
                <li className="list-group-item">{plot.text}</li>
              </ul>
            </li>
          ))}
        </ul>
      );
    };

    const newRound = () => {
        <button
            // onClick={this.props.handleNewRound}
            className="btn btn-primary btn-block btn-lg"
            value="accept"
        >
            Start a new round
            </button>
    };

    const Waiting = () => <h2>Waiting for {it} to start a new round</h2>;

    return (
      <div className="row">
        <div className="col-xs-12">
          <Plots />
          {iAmIt || filmAccepted ? <Waiting /> : <NewRound />}
        </div>
      </div>
    );
  }
}

export default Results;
