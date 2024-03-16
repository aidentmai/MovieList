import Header from "./components/header/Header";
import HomePage from "./components/homePage/HomePage";
import SavedMovie from "./components/savedMovie/SavedMovie";
import "./layout.scss";
import { useState, useEffect } from "react";

const types = ["Movies", "To Watch"];

const savedMoviesFromLocalStorage = JSON.parse(localStorage.getItem("savedMovies")) || [];

function App() {
  const [currentTab, setCurrentTab] = useState(localStorage.getItem('currentTab') || 'Movies');
  const [savedMovies, setSavedMovies] = useState(savedMoviesFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('currentTab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

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