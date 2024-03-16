// SavedMovie.jsx
import Card from "../card/Card";
import "./savedMovie.scss";

function SavedMovie({ savedMovies, setSavedMovies, setMovieList, currentTab }) {
  console.log(savedMovies);

  return (
    <div className="savedMovie">
      <div className="body">
        <div className="content">
          {savedMovies && savedMovies.length > 0 ? (
            <Card
              movieList={savedMovies} // Pass savedMovies as movieList
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              source="saved" // Indicate the source as "saved"
              setMovieList={setMovieList}
              currentTab={currentTab}
            />
          ) : (
            <p>No saved movies</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedMovie;
