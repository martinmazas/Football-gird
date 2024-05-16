import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery } = { ...props }
  return (
    <Box
      sx={{
        width: 400,
        maxWidth: '100%',
        backgroundColor: 'white'
      }}
    >
      <TextField fullWidth label="Enter player's name" id="playerName" value={query} onChange={handleChangeQuery} />
    </Box>
  );
}