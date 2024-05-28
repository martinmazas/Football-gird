import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery, handleKeyDown } = { ...props }
  return (
    <Box
      sx={{
        width: '10vw',
        maxWidth: '60%',
        backgroundColor: 'white',
        border: '2px solid',
        fontSize: '26px'
      }}
    >
      <TextField variant='filled' size='medium' fullWidth label="Type the player here" id="playerName" value={query} onChange={handleChangeQuery} onKeyDown={handleKeyDown} />
    </Box>
  );
}