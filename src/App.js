import SearchBar from "./SearchBar";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';

const styles = {
  button: {
    margin: '5vh 50vw',
    height: '40px',
    fontSize: '30px',
  },
  playGame: {
    whiteSpace: 'nowrap'
  }
}

function App() {
  const handleClick = () => {
    window.location.reload()
  }

  return (
    <div className="App">
      <GridTable />
      <div className="play-game" style={styles.playGame}>
        <SearchBar />
        <Button className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
      </div>
    </div>
  );
}

export default App;
