import React from 'react';
import { TextField } from '@mui/material';

export default function SearchBar({ search, setSearch }) {
  return (

    <div className='input-field'>
      <TextField 
        label="Search Movies…"
        variant="outlined"
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        autoFocus
        InputProps={{ style: { backgroundColor: '#222', color: '#fff' } }}
        InputLabelProps={{ style: { color: '#bbb' } }}
      />
    </div>
  );
}
