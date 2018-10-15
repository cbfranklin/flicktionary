import React, { Component } from "react";
import FilmList from './FilmList'
import Loader from './Loader'

class ChooseFilm extends Component {
  renderFilmList = films => {
    const { handleChooseFilm } = this.props

    return films.map((film, i) => {
      const { title, plot } = film

      return (
        <li key={i} className="list-group-item">
          <h3>{title}</h3>
          <p>{plot}</p>
          <button
            onClick={handleChooseFilm}
            value={i}
            className="btn btn-primary form-control"
          >
            Choose
            {" ["}
            {title}
            {"]"}
          </button>
        </li>
      );
    });
  }

  render() {
    const { it, iAmIt } = this.props;
    const films = [
      {
        title: "The Adventures of Ford Fairlane",
        plot:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mollis a ante eget iaculis, egestas enim a felis cursus tincidunt."
      }
    ];
    const filmList = this.renderFilmList(films)

    if (!iAmIt) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <Loader it={it} />
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <FilmList filmList={filmList} />
        </div>
      </div>
    )
  }
}

export default ChooseFilm;
