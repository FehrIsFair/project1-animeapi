import React from 'react';

const GenreList = (props) => {
  props.genre.sort();
  return (
    <ul id="genre" className="liststyle">
      {
        props.genre.map((genre, index) => {
          return <li>{genre}</li>
        })
      }
    </ul>
    
  )
}
export default GenreList