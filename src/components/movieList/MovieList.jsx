import "./movieList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card/Card";



function MovieList({ savedMovies, setSavedMovies }) {
  const [movieList, setMovieList] = useState([]);

  // Use AXIOS GET to grab data from TMDB database using their API key
  const getMovie = () => {
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

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <div className="movieList">
      <Card movieList={movieList} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
    </div>
  );
}

export default MovieList;
