import React, { Component } from "react";

class WritePlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plot: null
    };
  }

  render() {
    const { iAmIt, it, title, handleSubmitPlot, handleChangePlot, plotSubmitted } = this.props;
    const PlotForm = () => (
      <div>
        <h2 className="text-center">{title}</h2>
        <textarea value={this.props.plot} onChange={handleChangePlot} />
        <button
          onClick={handleSubmitPlot}
          className="btn btn-primary btn-block"
        >
          Submit Plot
        </button>
      </div>
    );

    const Waiting = () => (
      <p className="text-center">Waiting for opponents to write their plots</p>
    );

    return (
      <div className="row">
        <div className="col-xs-12">{iAmIt || plotSubmitted ? <Waiting /> : <PlotForm />}</div>
      </div>
    );
  }
}

export default WritePlot;
