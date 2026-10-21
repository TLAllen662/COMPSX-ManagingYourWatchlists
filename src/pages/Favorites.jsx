import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieGrid from '../components/MovieGrid';
import { getFavoriteMovies } from '../utils/favorites';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function loadFavoriteMovies() {
      setIsLoading(true);

      try {
        setFavoriteMovies(getFavoriteMovies());
        setError('');
      } catch (storageError) {
        setError(storageError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadFavoriteMovies();
    window.addEventListener('favoriteschange', loadFavoriteMovies);

    return () => {
      window.removeEventListener('favoriteschange', loadFavoriteMovies);
    };
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <LoadingSpinner message="Loading favorites..." />
      ) : favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;