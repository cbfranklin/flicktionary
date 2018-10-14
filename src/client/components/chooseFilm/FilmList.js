import React from 'react'

const FilmList = ({ filmList }) => {
  return (
    <div>
      <h2>Choose a film</h2>
      <ul className="list-group">{filmList}</ul>
    </div>
  );
};

export default FilmList