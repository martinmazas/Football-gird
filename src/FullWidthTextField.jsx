import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const styles = {
  field: {

  },
  box: {
    bgcolor: '#031825',
    maxWidth: '60rem',
    outline: 'none',
    padding: '0.2rem 0.4rem',
    borderRadius: '0.4rem',
    border: '0.2rem solid #f2b705'
  }
}

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery, handleKeyDown } = { ...props }
  return (
    <Box sx={styles.box}>
      <TextField style={styles.field} variant='filled' size='small' label="Type the player here" id="playerName" value={query} onChange={handleChangeQuery} onKeyDown={handleKeyDown} />
    </Box>
  );
}