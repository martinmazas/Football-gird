import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery, handleKeyDown } = { ...props }
  return (
    <Box
      sx={{
        maxWidth: '60%',
        backgroundColor: 'white',
      }}
    >
      <TextField variant='filled' size='small' label="Type the player here" id="playerName" value={query} onChange={handleChangeQuery} onKeyDown={handleKeyDown} />
    </Box>
  );
}