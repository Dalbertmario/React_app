import React, { useState } from "react";

function Button({ children, onclick }) {
  return <button onClick={onclick}>{children}</button>;
}
export default function SearchResult({ movie, handelSelect }) {
  const [isOpen, setisOpen] = useState(true);
  // const movieList = tempMovieData;
  return (
    <div className="movie" key={movie.imdbID}>
      <ul>
        <Button onclick={() => setisOpen((e) => !e)}>
          {isOpen ? "-" : "+"}
        </Button>
        {isOpen &&
          movie?.map((movie) => (
            <DisplayingMovieList movies={movie} select={handelSelect} />
          ))}
      </ul>
    </div>
  );
}

function DisplayingMovieList({ movies, select }) {
  return (
    <li onClick={() => select(movies.imdbID)}>
      <img src={movies.Poster} alt={movies.Title} />
      <span>
        <h3>{movies.Title}</h3>
        <p>{movies.Year}</p>
      </span>
    </li>
  );
}
