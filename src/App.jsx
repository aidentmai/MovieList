import Header from "./components/header/Header";
import HomePage from "./components/homePage/HomePage";
import SavedMovie from "./components/savedMovie/SavedMovie";
import MovieSearch from "./components/movieSearch/MovieSearch";
import "./layout.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const types = ["Movies", "To Watch"];

const savedMoviesFromLocalStorage =
  JSON.parse(localStorage.getItem("savedMovies")) || [];

function App() {
  // States
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("currentTab") || "Movies"
  );
  const [savedMovies, setSavedMovies] = useState(savedMoviesFromLocalStorage);
  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  const [movieList, setMovieList] = useState(() => {
    const storedMovieList = JSON.parse(localStorage.getItem("movieList"));
    return storedMovieList || [];
  });

  const [searchMovie, setSearchMovie] = useState("");

  // Search Movie
  const getMovieRequest = () => {
    if (searchMovie === "") {
      return;
    }
  
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${encodeURIComponent(searchMovie)}`
      )
      .then((response) => {
        const { data } = response;
        if (data.results) {
          console.log(data.results);
          setMovieList(data.results);
        } else {
          console.error("No movie results found.");
          // Optionally, you can set a default value for movieList or display an error message
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        // Optionally, you can set a default value for movieList or display an error message
      });
  };

  useEffect(() => {
    getMovieRequest();
  }, [searchMovie]);

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <>
      <div className="layout">
        <div className="header">
          <Header />
        </div>
        <div className="tabs">
          <div className="type">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setCurrentTab(type)}
                className={currentTab === type ? "active" : ""}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="search">
            <MovieSearch
              searchMovie={searchMovie}
              setSearchMovie={setSearchMovie}
            />
          </div>
        </div>
        <div className="contentContainer">
          {currentTab === "Movies" ? (
            <HomePage
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              movieList={movieList}
              setMovieList={setMovieList}
              currentTab={currentTab}
              searchMovie={searchMovie}
              setSearchMovie={setSearchMovie}
            />
          ) : (
            <SavedMovie
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              movieList={movieList}
              setMovieList={setMovieList}
              currentTab={currentTab}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
