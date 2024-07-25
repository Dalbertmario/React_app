import React, { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import MovieSelected from "./MovieSelected";
import MovieDetilas from "./MovieDetilas";

const key = "f57458bb";

export default function App() {
  const [movielist, setMovielist] = useState([]);
  const [query, setQuery] = useState("");
  // const [wacthedmovie, setWatchedMovie] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loader, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [wacthedmovie, setWatchedMovie] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
  function handelRemove(id) {
    setWatchedMovie((el) => el.filter((movie) => movie.imdbID !== id));
  }
  function handelWatched(movie) {
    setWatchedMovie((selected) => [...selected, movie]);

    // localStorage.setItem("watched", JSON.stringify([...wacthedmovie, movie]));
  }
  function handelSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handelCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(wacthedmovie));
    },
    [wacthedmovie]
  );

  useEffect(
    function () {
      const contoller = new AbortController();
      async function fetchMovie() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s='${query}`,
            { signal: contoller.signal }
          );

          if (!res.ok) throw new Error("No Result Found");

          // setLoading(false);
          const data = await res.json();
          if (data.Response === "False") throw new Error("Result not found");

          setMovielist(data.Search);
          setError("");
        } catch (err) {
          if (err.message !== "AbortError") {
            setError(err.message);
          }
          console.error(err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      if (!query.length < 3) {
        setMovielist([]);
        setError("");
      }
      fetchMovie();
    },
    [query]
  );

  return (
    <div className="app">
      <SearchBar>
        <h1>MyMovieRating</h1>
        <Search query={query} setquery={setQuery} />
        <NumResult movie={movielist} />
      </SearchBar>
      <Main>
        <Box>
          {loader && <IsLoading />}
          {!loader && !error && (
            <SearchResult
              movie={movielist}
              handelSelect={handelSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetilas
              selectedIdd={selectedId}
              handelClose={handelCloseMovie}
              onWatched={handelWatched}
              watched={wacthedmovie}
            />
          ) : (
            <MovieSelected movie={wacthedmovie} remove={handelRemove} />
          )}
        </Box>
      </Main>
    </div>
  );
}

function IsLoading() {
  return <h3 className="loading">Loading....</h3>;
}
function Main({ children }) {
  return <div className="sidebar">{children}</div>;
}

function SearchBar({ children }) {
  return <div className="search-bar">{children}</div>;
}

function NumResult({ movie }) {
  return <h3>Found {movie.length} result</h3>;
}
function Search({ query, setquery }) {
  const inputEl = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          setquery("");
        }
      }
      document.addEventListener("keydown", callback);
      inputEl.current.focus();
      console.log(inputEl);
    },
    [setquery]
  );
  return (
    <input
      type="text"
      placeholder="Search movie"
      value={query}
      onChange={(e) => setquery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Box({ children }) {
  return <div className="movie">{children}</div>;
}
