// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Typography ,Box } from '@mui/material';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import app from './app.css';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import { fetchMovies } from './api';

const queryClient = new QueryClient();

function AppContent() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 600);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError, error } = useQuery(
    ['movies', debouncedSearch],
    () => fetchMovies(debouncedSearch),
    {
      enabled: !!debouncedSearch,
      staleTime: 5 * 60 * 1000,
      retry: 1,
    }
  );

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 4 }}>
      <div className="search-container">
      <SearchBar search={search} setSearch={setSearch} />
      </div>

      {isLoading && (
        <Box sx={{display:'flex', justifyContent:'center', mt:4}}>
          <CircularProgress sx={{color:'#2979ff'}} size={48} />
        </Box>
      )}

      {isError && (
        <Typography variant="h6" color="error" align="center" sx={{ marginTop: 4 }}>
          Error loading movies: {error?.message || ''}
        </Typography>
      )}

      {data && data.results && <MovieGrid movies={data.results} onCardClick={setSelectedMovie} />}

      <MovieModal movie={selectedMovie} open={Boolean(selectedMovie)} onClose={() => setSelectedMovie(null)} />
    </Container>
  );

}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
