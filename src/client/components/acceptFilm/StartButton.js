import React from 'react'

const StartButton = ({ handleAcceptFilm, it, title }) => {
  return (
    <div>
      <div className="row">
        <div className="col-xs-12">
          <h2>{it} proposes the film</h2>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button
            onClick={handleAcceptFilm}
            className="btn btn-primary form-control"
            value="accept"
          >
            Never heard of it
          </button>
        </div>
        <div className="col-md-6">
          <button
            onClick={handleAcceptFilm}
            className="btn btn-default form-control"
            value="deny"
          >
            I know this film
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartButton