const FAVORITES_STORAGE_KEY = 'favoriteMovies';

export function getFavoriteMovies() {
  const storedMovies = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedMovies) {
    return [];
  }

  const movies = JSON.parse(storedMovies);

  if (!Array.isArray(movies)) {
    throw new Error('Saved favorites data is invalid.');
  }

  return movies;
}

export function toggleFavoriteMovie(movie) {
  const favoriteMovies = getFavoriteMovies();
  const movieIndex = favoriteMovies.findIndex(
    (favoriteMovie) => favoriteMovie.id === movie.id
  );
  const isFavorite = movieIndex === -1;

  if (isFavorite) {
    favoriteMovies.push(movie);
  } else {
    favoriteMovies.splice(movieIndex, 1);
  }

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteMovies));
  window.dispatchEvent(new Event('favoriteschange'));

  return isFavorite;
}
