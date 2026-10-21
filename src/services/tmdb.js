const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export async function getPopularMovies() {
  if (!apiKey || !baseUrl) {
    throw new Error('TMDB API configuration is missing.');
  }

  const response = await fetch(
    `${baseUrl}/movie/popular?api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Unable to load popular movies (${response.status}).`);
  }

  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  if (!apiKey || !baseUrl) {
    throw new Error('TMDB API configuration is missing.');
  }

  const response = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Unable to search movies (${response.status}).`);
  }

  const data = await response.json();
  return data.results;
}
