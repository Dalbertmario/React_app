import { useState } from "react";

function Button({ children, onclick }) {
  return <button onClick={onclick}>{children}</button>;
}

export default function MovieSelected({ movie, remove }) {
  // const [wacthedmovie, setWatchedMovie] = useState(tempWatchedData);
  const [isOpen, setisOpen] = useState(true);
  return (
    <div className="movie">
      <ul>
        <div className="details-watched">
          <span>
            <h3>Movie You Selected</h3>{" "}
            <Button onclick={() => setisOpen((e) => !e)}>
              {isOpen ? "-" : "+"}
            </Button>
          </span>
          <span>
            <p>🎞 {movie.length} movie</p>
            <p>
              ⭐{" "}
              {Math.round(
                movie.map((el) => el.imdbRating).reduce((a, b) => a + b, 0)
              )}{" "}
              Imdb
            </p>
            <p>
              🌟{" "}
              {Math.round(
                movie.map((el) => el.userRating).reduce((a, b) => a + b, 0)
              )}{" "}
              Total userRating
            </p>
            <p>
              🕒{" "}
              {Math.round(
                movie.map((el) => el.runtime).reduce((a, b) => a + b, 0)
              )}{" "}
              min
            </p>
          </span>
        </div>
        {isOpen &&
          movie.map((movies) => (
            <DisplayingSelectedMovie
              movie={movies}
              key={movies.imdbID}
              removeing={remove}
            />
          ))}
      </ul>
    </div>
  );
}

function DisplayingSelectedMovie({ movie, removeing }) {
  return (
    <li className="diplaySelecedMovie">
      <img src={movie.poster} alt={movie.imdbID} />
      <h3>{movie.title}</h3>
      <span className="watched-span">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.imdbRating}</p>
        <p>📽 {movie.userRating}</p>
        <p>🕒 {movie.runtime}</p>
      </span>
      <Button onclick={() => removeing(movie.imdbID)}>-</Button>
    </li>
  );
}
