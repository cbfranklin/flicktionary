import React, { Component } from "react";

class WritePlot extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

    const PlotForm = () => (
      <div>
        <h2>The title of the film is</h2>
        <h3>{title}</h3>
        <textarea value={plot} onChange={handleChangePlot} />
        <button
          onClick={handleSubmitPlot}
          className="btn btn-primary btn-block"
        >
          Submit Your Plot
        </button>
      </div>
    );

    const Waiting = () => (
      <p >Waiting for others to write their plots</p>
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          {iAmIt || plotSubmitted ? <Waiting /> : <PlotForm />}
        </div>
      </div>
    );
  }
}

export default WritePlot;
