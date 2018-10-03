import React, { Component } from "react";
import PlotEditor from "./PlotEditor";

class WritePlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plot: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log("handle change");
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const {
      iAmIt,
      it,
      title,
      handleSubmitPlot,
      handleChangePlot,
      plotSubmitted,
      plot
    } = this.props;

    const Waiting = () => <p>Waiting for others to write their plots</p>;

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>The title of the film is</h2>
          <h3>{title}</h3>
          {iAmIt || plotSubmitted === title ? (
            <Waiting />
          ) : (
            <PlotEditor
              plot={plot}
              handleChangePlot={handleChangePlot}
              handleSubmitPlot={handleSubmitPlot}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WritePlot;
