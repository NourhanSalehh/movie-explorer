import React from 'react';
import { Modal, Backdrop, Typography, Chip, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const TmdbImageUrl = 'https://image.tmdb.org/t/p/w500';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 }
};

const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export default function MovieModal({ movie, open, onClose }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  if (!movie) return null;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: { timeout: 500, sx: { backgroundColor: 'rgba(0,0,0,0.8)' } },
          }}
          aria-labelledby="movie-title"
          aria-describedby="movie-description"
        >

          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
            style={{
               position: 'fixed',
              outline: 'none',
              top: '10%',
              left: '5%',
              transform: 'translate(50%, 50%)',
              backgroundColor: '#212121',
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
              width: isSmallScreen ? '90%' : 600,
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: 24,
              color: 'white',
            }}
          >
            
            {movie.poster_path && (
              <img
                src={TmdbImageUrl + movie.poster_path}
                alt={movie.title}
                style={{ width: '100%', maxHeight: 350, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
              />
            )}
            <Typography id="movie-title" variant="h5" component="h2" gutterBottom sx={{ color: '#90caf9' }}>
              {movie.title} ({year})
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#bbb' }}>
              Rating: {movie.vote_average} ⭐
            </Typography>
            <div style={{ marginBottom: 12 }}>
              {movie.genre_ids?.map((id) => (
                <Chip
                  key={id}
                  label={genreMap[id] || 'Unknown'}
                  color="primary"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </div>
            <Typography id="movie-description" variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {movie.overview || 'No description available.'}
            </Typography>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
