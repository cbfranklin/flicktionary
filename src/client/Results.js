import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt, plots, handleVotePlot, plotVoted, users } = this.props;
    const getUserByID = id => {
      console.log(users)
      console.log(id)
      const index = users.findIndex(user => user.id === id);
      console.log(index)
      console.log(users[index])
      return users[index];
    }
    const Plots = () => {
      return (
        <ul>
          {plots.map((plot, i) => (
            <li key={i}>
              <ul>
                <li>{plot.votes}</li>
                <li>{plot.creator}</li>
                <li>{plot.text}</li>
                <li>{getUserByID(plot.creator).username}</li>
              </ul>
            </li>
          ))}
        </ul>
      );
    };

    const Waiting = () => (
      <h2>Waiting for opponents to vote</h2>
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          <Plots />
        </div>
      </div>
    );
  }
}

export default Results;
