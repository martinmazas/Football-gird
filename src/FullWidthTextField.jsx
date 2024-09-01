import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import './index.css'

export default function FullWidthTextField(props) {
  const { query, handleChangeQuery, handleKeyDown, isError } = { ...props }

  const styles = {
    box: {
      bgcolor: '#031825',
      maxWidth: '60rem',
      outline: 'none',
      padding: '0.2rem 0.4rem',
      borderRadius: '0.4rem',
      border: `0.2rem solid ${isError ? 'red' : '#f2b705'}`,
      '@media (minWidth: 600px)': {
        padding: '0.4rem 0.8rem',
        borderRadius: '0.6rem',
      },
      '@media (minWidth: 960px)': {
        padding: '0.6rem 1.2rem',
        borderRadius: '0.8rem',
      },
    },
    field: {
      color: '#fff',
      width: '100%',
      fontSize: '1rem', // Set to at least 16px to prevent zooming on mobile
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)', // Placeholder color with some transparency
        fontSize: 'inherit', // Inherit the font size from the input
      },
      '@media (minWidth: 600px)': {
        fontSize: '1.2rem',
      },
      '@media (minWidth: 960px)': {
        fontSize: '1.4rem',
      },
    },
  };

  return (
    <Box sx={styles.box}>
      <Input
        disableUnderline={true}
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