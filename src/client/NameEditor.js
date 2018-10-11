import React, { Component } from "react";

class NameEditor extends Component {
  constructor(props) {
    super(props);

  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
      <hr/>
      <form onSubmit={this.props.handleSubmitName}>
        <label htmlFor="username">Hello my name is: </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={this.handleChange}
        />
        <input
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          value="Submit"
        />
      </form>
      </div>
    );
  }
}

export default NameEditor;
