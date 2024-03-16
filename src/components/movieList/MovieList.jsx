// MovieList.jsx
import "./movieList.scss";
import axios from "axios";
import { useEffect } from "react";
import Card from "../card/Card";

function MovieList({ savedMovies, setSavedMovies, movieList, setMovieList, currentTab, searchMovie, setSearchMovie}) {
  

  useEffect(() => {
    if (!movieList.length) {
      fetchMovieList();
    }
  }, []); // Fetch movie list only on component mount if movieList is not available

  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(movieList));
  }, [movieList]); // Update local storage whenever movieList changes

  const fetchMovieList = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`
      )
      .then((res) => {
        setMovieList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <div className="movieList">
      <Card
        movieList={movieList}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
        setMovieList={setMovieList}
        currentTab={currentTab}
        searchMovie={searchMovie}
        setSearchMovie={setSearchMovie}
      />
    </div>
  );
}

export default MovieList;
