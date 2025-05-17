import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Base URL for movie poster images
const TmdbImageUrl = 'https://image.tmdb.org/t/p/w500';

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function MovieCard({ movie, onClick }) {

  const isValidImage = Boolean(movie.poster_path);

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(movie)} 
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        // Handle keyboard activation (Enter or Space)
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(movie);
        }
      }}
    >

      <Card
        sx={{
          height: '100%',
          backgroundColor: '#222',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        
        {isValidImage ? (
          <CardMedia
            component="img"
            image={TmdbImageUrl + movie.poster_path}
            alt={movie.title}
            sx={{ filter: 'brightness(0.9)', maxHeight: 340, objectFit: 'cover' }}
          />
        ) : (

          <Box
            sx={{
              height: 340,
              backgroundColor: '#555',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: 18,
              fontStyle: 'italic',
            }}
          >
            No Image
          </Box>
        )}

        <CardContent
          sx={{
            flexGrow: 1,
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            noWrap
            sx={{ fontWeight: 700, color: '#90caf9' }}
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1, color: '#aaa' }}>
            {year}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
