import MovieList from "../movieList/MovieList";
import "./homePage.scss";

function HomePage({ savedMovies, setSavedMovies, movieList }) {
  return (
    <div className="homePage">
      <div className="body">
        <div className="content">
          <MovieList
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            movieList={movieList}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
