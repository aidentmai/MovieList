import MovieList from "../movieList/MovieList";
import "./homePage.scss";

function HomePage({ savedMovies, setSavedMovies, setMovieList, movieList, currentTab, searchMovie, setSearchMovie}) {
  return (
    <div className="homePage">
      <div className="body">
        <div className="content">
          
          <MovieList
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            movieList={movieList}
            setMovieList={setMovieList}
            currentTab={currentTab}
            searchMovie={searchMovie}
            setSearchMovie={setSearchMovie}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
