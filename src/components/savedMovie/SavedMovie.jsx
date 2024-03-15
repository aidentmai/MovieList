import "./savedMovie.scss";
import { useState, useEffect } from "react";
import Card from "../card/Card";

function SavedMovie({ savedMovies, setSavedMovies }) {
  //   useEffect(() => {
  //     const retrieveSavedMovies = () => {
  //       const savedMovies = localStorage.getItem("savedMovies");
  //       return savedMovies ? JSON.parse(savedMovies) : [];
  //     };

  //     setSavedMovies(retrieveSavedMovies());
  //   }, []);

  return (
    <div className="savedMovie">
      <div className="body">
        <div className="content">
        {savedMovies && savedMovies.length > 0 ? (
            <Card movieList={savedMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
          ) : (
            <p>No saved movies</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedMovie;
