import { useEffect, useState } from "react";
import StarRating from "./StarRating";
// import React {useState,useEffect} from "react";
export default function MovieDetilas({
  selectedIdd,
  handelClose,
  onWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(movie.imdbID);
  const StarRate = watched.find(
    (movie) => movie.imdbID === selectedIdd
  )?.userRating;

  function HandelAdd() {
    const newWathedMovie = {
      imdbID: selectedIdd,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      director,
      userRating,
    };
    handelClose();

    onWatched(newWathedMovie);
  }
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: release,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const key = "f57458bb";
  useEffect(
    function () {
      async function fetching() {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedIdd}`
        );

        const data = await res.json();
        setMovie(data);
        setLoading(false);
      }
      fetching();
    },
    [selectedIdd]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = title;

      return function () {
        document.title = "MyMovieRating";
      };
    },
    [title]
  );
  return (
    <div className="clicked">
      {loading ? (
        <IsLoading />
      ) : (
        <>
          <div className="clicked-details">
            <img src={poster} alt="movieposter" />
            <div className="selected-details">
              <h2>{title}</h2>
              <p>
                {release} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐ {imdbRating} ImDb rating</span>
              </p>
            </div>
            <Button onclick={handelClose}>&times;</Button>
          </div>
          <section>
            <div className="star">
              {!isWatched ? (
                <>
                  <StarRating
                    size="30px"
                    maxRating={10}
                    color={"#fcc419"}
                    onSetRating={setUserRating}
                  />
                  {userRating >= 0 && (
                    <Button className="Add-btn" onclick={HandelAdd}>
                      Add-to-List
                    </Button>
                  )}
                </>
              ) : (
                <p>You already Reated this movie {StarRate}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starting {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function IsLoading() {
  return <h3 className="loading">Loading....</h3>;
}
function Button({ children, onclick }) {
  return <button onClick={onclick}>{children}</button>;
}
