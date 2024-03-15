import Header from "./components/header/Header";
import HomePage from "./components/homePage/HomePage";
import SavedMovie from "./components/savedMovie/SavedMovie";
import "./layout.scss";
import { useState } from "react";

const types = ["Movies", "To Watch"];


function App() {
  const [currentTab, setCurrentTab] = useState("Movies");
  const [savedMovies, setSavedMovies] = useState([]);

  const handleSaveMovie = (movie) => {
    setSavedMovies(prev => [...prev, movie]);
    setMovieList(prev => prev.filter(m => m.id !== movie.id));
  };
  return (
    <>
      <div className="layout">
        <div className="header">
          <Header />
        </div>
        <div className="tabs">
          <div className="type">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setCurrentTab(type)}
                className={currentTab === type ? "active" : ""}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="search">
            <form>
              <input type="text" name="search" placeholder="e.g Batman" />
              <button>
                <img src="/search.png" alt="" />
              </button>
            </form>
          </div>
        </div>
        <div className="contentContainer">
          {currentTab === "Movies" ? (
            <HomePage
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
          ) : (
            <SavedMovie savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
