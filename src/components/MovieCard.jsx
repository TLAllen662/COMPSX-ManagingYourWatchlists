import { useEffect, useState } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import { getFavoriteMovies, toggleFavoriteMovie } from '../utils/favorites';

function MovieCard({ movie }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMovieContext();
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    function updateFavoriteState() {
      try {
        setIsFavorite(
          getFavoriteMovies().some(
            (favoriteMovie) => favoriteMovie.id === movie.id
          )
        );
        setError('');
      } catch (storageError) {
        setError(storageError.message);
      }
    }

    updateFavoriteState();
    window.addEventListener('favoriteschange', updateFavoriteState);

    return () => {
      window.removeEventListener('favoriteschange', updateFavoriteState);
    };
  }, [movie.id]);

  function handleFavoriteClick() {
    try {
      setIsFavorite(toggleFavoriteMovie(movie));
      setError('');
    } catch (storageError) {
      setError(storageError.message);
    }
  }

  function handleWatchlistClick() {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <div className="movie-card">
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
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button
          type="button"
          className={`favorite-button${isFavorite ? ' favorited' : ''}`}
          aria-pressed={isFavorite}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
        <button
          type="button"
          className={`watchlist-button${isInWatchlist ? ' in-watchlist' : ''}`}
          onClick={handleWatchlistClick}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
        {error && <p className="favorite-error">{error}</p>}
      </div>
    </div>
  );
};

export default MovieCard;