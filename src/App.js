import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import searchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com/?apikey=3a3be75d";

const movie1 = {
  Title: "Superman IV: The Quest for Peace",
  Year: "1987",
  imdbID: "tt0094074",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMmIwZWY1YTYtNDlhOS00NDRmLWI4MzItNjk2NDc1N2NhYzNlXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg",
};
  
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovie = async (title) => {
    const respnose = await fetch(`${API_URL}&s=${title}`);

    const data = await respnose.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Superman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img src={searchIcon} onClick={() => searchMovie(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found </h2>
        </div>
      )}
    </div>
  );
};

export default App;
