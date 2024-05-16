import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery } = { ...props }
  return (
    <Box
      sx={{
        width: 300,
        maxWidth: '40%',
        backgroundColor: 'white'
      }}
    >
      <TextField fullWidth label="Enter player's name" id="playerName" value={query} onChange={handleChangeQuery} />
    </Box>
  );
}