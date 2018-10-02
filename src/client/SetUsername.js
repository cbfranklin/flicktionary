import React, { Component } from "react";
class SetUsername extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

          <div className="row">
            <div className="col-xs-12">
            <h3>Set Username</h3>
              <input
                type="text"
                placeholder="Username"
                value={this.props.username}
                onChange={e => this.setState({ username: e.target.value })}
                className="form-control"
              />
              <button
                onClick={this.props.handleSetUsername}
                className="btn btn-primary form-control"
              >
                Set Username
              </button>
            </div>
          </div>

    );
  }
}

export default SetUsername;
