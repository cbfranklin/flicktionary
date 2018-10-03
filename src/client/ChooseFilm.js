import React, { Component } from "react";

class ChooseFilm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt } = this.props;
    const films = [
      {
        title: "The Adventures of Ford Fairlane",
        plot: "Lorem"
      }
    ];
    const renderedFilms = films.map((film, i) => {
      return <li key={i} className="list-group-item">
          <button onClick={this.props.handleChooseFilm} value={i} className="btn btn-default form-control">
            {film.title}
          </button>
          <p>{film.plot}</p>
        </li>;
    });
    const FilmList = () => {
      return <div>
        <h2>Choose a film</h2>
        <ul className="list-group">
          {renderedFilms}
        </ul>
      </div>
    };

    const Waiting = () => (
      <h2>
        Waiting for <em>{it}</em> to choose a film
      </h2>
    );

    return (
      <div className="row">
        <div className="col-xs-12">{iAmIt ? <FilmList /> : <Waiting />}</div>
      </div>
    );
  }
}

export default ChooseFilm;
