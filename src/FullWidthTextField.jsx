import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery, handleKeyDown } = { ...props }
  return (
    <Box
      sx={{
        width: 300,
        maxWidth: '80%',
        backgroundColor: 'white'
      }}
    >
      <TextField fullWidth label="Enter player's name" id="playerName" value={query} onChange={handleChangeQuery} onKeyDown={handleKeyDown} />
    </Box>
  );
}