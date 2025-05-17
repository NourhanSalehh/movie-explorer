import { CircularProgress, Box } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 4 
      }}
    >
      <CircularProgress sx={{ color: '#2979ff' }} />
    </Box>
  );
}
