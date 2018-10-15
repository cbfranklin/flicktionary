import React, { Component } from "react";

class ChooseFilm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { it, iAmIt, randomFilms, handleRandomFilmRequest } = this.props;
    // const films = [
    //   {
    //     title: "Jungle 2 Jungle",
    //     plot:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mollis a ante eget iaculis, egestas enim a felis cursus tincidunt."
    //   }
    // ];
    console.log({ randomFilms });
    if (!randomFilms) {
      handleRandomFilmRequest();
      console.log("Requesting random films...");
      return false;
    }
    const renderedFilms = randomFilms.map((film, i) => {
      return (
        <li key={i} className="list-group-item">
          <h3>{film.title}</h3>
          <p>{film.plot}</p>
          <button
            onClick={() => this.props.handleChooseFilm(i)}
            value={i}
            className="btn btn-primary form-control"
          >
            Choose
            {" ["}
            {film.title}
            {"]"}
          </button>
        </li>
      );
    });
    const FilmList = () => {
      if (randomFilms && renderedFilms) {
        return (
          <div>
            <h2>Choose a film</h2>
            <ul className="list-group">{renderedFilms}</ul>
          </div>
        );
      } else {
        return <h3>Loading...</h3>;
      }
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
