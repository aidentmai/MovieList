import { useState, useEffect } from "react";
import "./card.scss";

function Card({ movieList, savedMovies, setSavedMovies }) {
  const [saved, setSaved] = useState(null);
  

  const handleButtonClick = (movie) => {
    setSaved(prevSaved => prevSaved === movie.id ? null : movie.id);
  };

//   useEffect(() => {
//     const retrieveSavedMovies = () => {
//       const savedMovies = localStorage.getItem("savedMovies");
//       return savedMovies ? JSON.parse(savedMovies) : [];
//     };

//     setSavedMovies(retrieveSavedMovies());
//   }, []);

  useEffect(() => {
    if (saved !== null) {
      if (savedMovies.find(movie => movie.id === saved)) {
        setSavedMovies(prev => prev.filter(movie => movie.id !== saved));
      } else {
        const movieToSave = movieList.find(movie => movie.id === saved);
        if (movieToSave) {
          setSavedMovies(prev => [...prev, movieToSave]);
        }
      }
    }
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <div className="cardContainer">
      {movieList.filter(movie => !savedMovies.find(savedMovie => savedMovie.id === movie.id)).map((movie) => (
        <div className="card" key={movie.id}>
          <div className="save">
            <button
              onClick={() => {
                handleButtonClick(movie);
              }}
              className={`button ${saved === movie.id ? "saved" : ""}`}
            >
              {saved === movie.id ? (
                <img src="/star.png" alt="" />
              ) : (
                <img src="/trash.png" alt="" />
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