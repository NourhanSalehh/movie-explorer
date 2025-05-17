import React from 'react';
import { Grid, Typography } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onCardClick }) {
  // If no movies are available
  if (!movies?.length) {
    return (
      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        sx={{ marginTop: 4 }}
      >
        No movies found.
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={3} 
      justifyContent="center"
      alignItems="stretch" 
      role="list"
    >
      {movies.map(movie => (
        <Grid
          item
          key={movie.id}
          sm={6}   
          md={4}    
          lg={3}    
          role="listitem"
        >
          <MovieCard movie={movie} onClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
}
