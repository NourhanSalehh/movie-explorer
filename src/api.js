const TmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
const TmdbBaseUrl = 'https://api.themoviedb.org/3';

export async function fetchMovies(query) {
    
if (!query) return { results: [] };
const url = `${TmdbBaseUrl}/search/movie?api_key=${TmdbApiKey}&query=${encodeURIComponent(query)}`;
const response = await fetch(url);

if (!response.ok) throw new Error('Failed to load movies');
return response.json();
}
