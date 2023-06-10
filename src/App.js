import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";

import MovieCard from "./MovieCard.jsx";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `http://www.omdbapi.com/?apikey=fbb0154e&s=${title}`
    )}`;

    try {
      const response = await fetch(allOriginsUrl);
      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      setMovies(parsedData.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Handle the error
    }
  };

  useEffect(() => {
    searchMovies("star wars");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
