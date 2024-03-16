function MovieSearch(props) {
  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          placeholder="Search for a movie..."
          onChange={(event) => props.setSearchMovie(event.target.value)}
        />
        <button >
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default MovieSearch;
