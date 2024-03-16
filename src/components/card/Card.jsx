// Card.jsx code
import { useState, useEffect } from "react";
import "./card.scss";

function Card({
  movieList,
  setMovieList,
  savedMovies,
  setSavedMovies,
  source,
  currentTab,
}) {
  const [saved, setSaved] = useState(null);
  const [isFlipped, setIsFlipped] = useState({});

  const handleFlip = (movieId) => {
    setIsFlipped(prevState => ({ ...prevState, [movieId]: !prevState[movieId] }));
  };

  const addToMovieList = (movieToAdd) => {
    // Check if the movie to add exists
    if (movieToAdd) {
      // Update movieList state by adding the movie
      setMovieList((prevMovieList) => [...prevMovieList, movieToAdd]);
    }
  };
  const removeFromMovieList = (movieId) => {
    setMovieList((prevMovieList) =>
      prevMovieList.filter((movie) => movie.id !== movieId)
    );
  };

  const handleButtonClick = (movie) => {
    const isSaved = savedMovies.find(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (isSaved) {
      // If the movie is already saved, remove it
      const updatedSavedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.id !== movie.id
      );
      setSavedMovies(updatedSavedMovies);
      // Add the movie back to the movieList
      addToMovieList(movie); // Add the movie back to movieList
    } else {
      // If the movie is not saved, add it to savedMovies
      setSavedMovies((prevSavedMovies) => [...prevSavedMovies, movie]);
      // Remove the movie from the movieList
      removeFromMovieList(movie.id);
    }
    // Toggle the saved state of the movie
    setSaved((prevSaved) => (prevSaved === movie.id ? null : movie.id));
  };

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <div className="cardContainer">
      {(source === "saved" ? savedMovies : movieList).map((movie) =>
        !isFlipped[movie.id] ? (
          <div className="cardFront" key={movie.id}>
            <div className="save">
              <button
                onClick={() => {
                  handleButtonClick(movie);
                }}
                className={`button ${saved === movie.id ? "saved" : ""}`}
              >
                {currentTab === "To Watch" ? (
                  <img src="/trash.png" alt="Remove from saved" />
                ) : (
                  <img src="/star.png" alt="Add to saved" />
                )}
              </button>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              onClick={() => handleFlip(movie.id)}
            />
            <p>{movie.title}</p>
          </div>
        ) : (
          <div className="cardBack" key={movie.id}>
            <div className="save">
              <button
                onClick={() => {
                  handleButtonClick(movie);
                }}
                className={`button ${saved === movie.id ? "saved" : ""}`}
              >
                {currentTab === "To Watch" ? (
                  <img src="/trash.png" alt="Remove from saved" />
                ) : (
                  <img src="/star.png" alt="Add to saved" />
                )}
              </button>
            </div>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <button onClick={() => handleFlip(movie.id)}>Close</button>
          </div>
        )
      )}
    </div>
  );
}

export default Card;
