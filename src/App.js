import SearchBar from "./SearchBar";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';
import { useEffect, useState } from "react";
import { getRandomNumbers } from "./Utils/functions";
import countries from './countries.json'
import teams from './teams.json'
import RowRadioButtonsGroup from "./RowRadioButtonsGroup";

const styles = {
  button: {
    margin: '2vh 10vw',
    fontSize: '30px',
  },
  playGame: {
    whiteSpace: 'nowrap',
    margin: 'auto 35vw',
  },
  grid: {
    margin: 'auto auto'
  },
  options: {
    backgroundColor: "white",
    width: '500px',
    height: '100px',
    margin: 'auto auto',
    position: 'absolute',
    visibility: 'hidden'
  }
}

function App() {
  const handleClick = () => {
    window.location.reload()
  }

  const rows = 4;
  const columns = 4;

  const [randomNumbersCountries, setRandomNumbersCountries] = useState([])
  const [randomNumbersTeams, setRandomNumbersTeams] = useState([])
  const [score, setScore] = useState(0)
  const [playerOptions, setPlayerOptions] = useState([])

  useEffect(() => {
    const randomCountries = getRandomNumbers(rows, countries)
    const randomTeams = getRandomNumbers(columns, teams)

    setRandomNumbersCountries(randomCountries)
    setRandomNumbersTeams(randomTeams)
  }, [])

  useEffect(() => {
    if (score === (rows - 1) * (columns - 1)) alert('You won')
  }, [score], setTimeout(1200))


  return (
    (randomNumbersCountries.length && randomNumbersTeams.length) ?
      <div className="App">
        <div style={{
          backgroundColor: "white",
          width: '500px',
          height: '100px',
          margin: 'auto auto',
          position: 'absolute',
          visibility: playerOptions.length > 1 ? 'visible' : 'hidden'
        }}>
          <RowRadioButtonsGroup playerOptions={playerOptions} setPlayerOptions={setPlayerOptions} />
        </div>
        <GridTable style={styles.grid} rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} />
        <div className="play-game" style={styles.playGame}>
          <SearchBar randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} scoreState={{ score, setScore }} setPlayerOptions={setPlayerOptions} />
          <Button color='error' className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
        </div>
      </div >
      : null
  );
}

export default App;
