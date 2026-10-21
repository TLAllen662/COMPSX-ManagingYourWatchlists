import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const MovieContext = createContext(null);
const WATCHLIST_STORAGE_KEY = 'watchlistMovies';

function loadWatchlist() {
  try {
    const stored = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(loadWatchlist);

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      // Storage may be unavailable or full; keep the in-memory state working.
    }
  }, [watchlist]);

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((current) =>
      current.some((item) => item.id === movie.id) ? current : [...current, movie]
    );
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((current) => current.filter((item) => item.id !== movieId));
  }, []);

  const value = useMemo(
    () => ({ watchlist, addToWatchlist, removeFromWatchlist }),
    [watchlist, addToWatchlist, removeFromWatchlist]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMovieContext() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }

  return context;
}
