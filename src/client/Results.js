import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt, plots, handleNewRound, users, title } = this.props;
    const getUserByID = id => {
      const userIndex = users.findIndex(user => user.id === id);
      return users[userIndex];
    };
    const Plots = () => {
      return <ul className="list-group">
          {plots.map((plot, i) => <li className="list-group-item" key={i}>
              <div className={plot.isReal ? "alert alert-success" : undefined}>
                {plot.isReal && <h3>The real plot</h3>}
                <ul className="list-group">
                  <li className="list-group-item">
                    Author
                    <span className="badge">
                      {(getUserByID(plot.creator) &&
                        getUserByID(plot.creator).username) ||
                        "??"}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Votes
                    <span className="badge">{plot.votes}</span>
                  </li>
                  <br />
                  <li className="list-group-item">{plot.text}</li>
                </ul>
              </div>
            </li>)}
        </ul>;
    };

    const NewRound = () => {
      return (
        <button
          // onClick={this.props.handleNewRound}
          className="btn btn-primary btn-block btn-lg"
          onClick={handleNewRound}
        >
          Start a new round
        </button>
      );
    };

    const Waiting = () => <h2>Waiting for {it} to start a new round</h2>;

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>The title of the film is</h2>
          <h3>{title}</h3>
          <h4>Results</h4>
          <Plots />
          {iAmIt ? <Waiting /> : <NewRound />}
        </div>
      </div>
    );
  }
}

export default Results;
