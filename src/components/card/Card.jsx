// Card.jsx code
import { useState, useEffect } from "react";
import "./card.scss";

function Card({ movieList, savedMovies, setSavedMovies, source, removeFromMovieList }) {
  const [saved, setSaved] = useState(null);

  const handleButtonClick = (movie) => {
    const isSaved = savedMovies.find((savedMovie) => savedMovie.id === movie.id);
    if (isSaved) {
      // If the movie is already saved, remove it
      const updatedSavedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== movie.id);
      setSavedMovies(updatedSavedMovies);
    } else {
      // If the movie is not saved, add it to savedMovies
      setSavedMovies((prevSavedMovies) => [...prevSavedMovies, movie]);
    }
    // Remove the movie from the movieList
    removeFromMovieList(movie.id);
    // Toggle the saved state of the movie
    setSaved((prevSaved) => (prevSaved === movie.id ? null : movie.id));
  };

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <div className="cardContainer">
      {(source === "saved" ? savedMovies : movieList).map((movie) => (
        <div className="card" key={movie.id}>
          <div className="save">
            <button
              onClick={() => {
                handleButtonClick(movie);
              }}
              className={`button ${saved === movie.id ? "saved" : ""}`}
            >
              {saved === movie.id ? (
                <img src="/trash.png" alt="Remove from saved" />
              ) : (
                <img src="/star.png" alt="Add to saved" />
              )}
            </button>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
