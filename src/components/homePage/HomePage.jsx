import MovieList from "../movieList/MovieList"
import "./homePage.scss";

function HomePage({ savedMovies, setSavedMovies }) {
  return (
    <div className="homePage">
      <div className="body">
        <div className="content">
        <MovieList savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
