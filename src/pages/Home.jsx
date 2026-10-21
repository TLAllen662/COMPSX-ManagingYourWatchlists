import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies, searchMovies } from '../services/tmdb';

function Home({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadMovies() {
      setError('');
      setIsLoading(true);

      try {
        const results = searchQuery.trim()
          ? await searchMovies(searchQuery)
          : await getPopularMovies();

        if (isCurrentRequest) {
          setMovies(results);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(requestError.message);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isCurrentRequest = false;
    };
  }, [searchQuery]);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchQuery.trim() ? 'Search Results' : 'Popular Movies'}</h2>
        <p>
          {searchQuery.trim()
            ? `Results for "${searchQuery.trim()}"`
            : 'Discover and save your favorite films'}
        </p>
      </div>
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="empty-state">
          <p>No movies found.</p>
        </div>
      )}
    </main>
  );
};

export default Home;