import { useMovieContext } from '../contexts/MovieContext';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovieContext();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you plan to watch</p>
      </div>
      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="movie-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-details">
                  <span className="movie-rating">⭐ {movie.vote_average}</span>
                  <span className="movie-year">
                    {movie.release_date?.substring(0, 4)}
                  </span>
                </div>
                <button
                  type="button"
                  className="favorite-button favorited"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty.</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
