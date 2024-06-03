import Box from '@mui/material/Box';
import Input from '@mui/material/Input';


const styles = {
  field: {
    color: '#fff'
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
      <Input
        style={styles.field}
        placeholder="Type the player here"
        id="playerName"
        value={query}
        onChange={handleChangeQuery}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}