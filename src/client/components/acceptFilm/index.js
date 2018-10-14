import React, { Component } from "react";
import Loader from './Loader'
import StartButton from './StartButton'

class AcceptFilm extends Component {
  render() {
    const { handleAcceptFilm, it, iAmIt, title } = this.props;
    const { filmAccepted } = title
    
    if (iAmIt || filmAccepted === title) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <Loader title={title} />
          </div>
        </div>
      )
    }
    
    return (
      <div className="row">
        <div className="col-xs-12">
          <StartButton handleAcceptFilm={handleAcceptFilm} it={it} title={title} />
        </div>
      </div>
    )
  }
}

export default AcceptFilm;
