import React, { Component } from "react";

class PlotEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.plot
    };
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmitPlot}>
        <textarea
          id="plot"
          name="plot"
          value={this.state.plot}
          onChange={this.handleChange}
        />
        <input className="btn btn-primary btn-lg btn-block" type="submit" value="Submit" />
      </form>
    );
  }
}

export default PlotEditor;
