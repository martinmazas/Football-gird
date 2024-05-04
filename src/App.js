import SearchBar from "./SearchBar";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';
import { useEffect, useState } from "react";
import { getRandomNumbers } from "./Utils/functions";
import countries from './countries.json'
import teams from './teams.json'

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

  useEffect(() => {
    const randomCountries = getRandomNumbers(rows, countries)
    const randomTeams = getRandomNumbers(columns, teams)

    setRandomNumbersCountries(randomCountries)
    setRandomNumbersTeams(randomTeams)
  }, [])

  useEffect(() => {
    if (score === (rows - 1) * (columns - 1)) alert('You win')
  }, [score])


  return (
    (randomNumbersCountries.length && randomNumbersTeams.length) ?
      <div className="App">
        <GridTable style={styles.grid} rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} />
        <div className="play-game" style={styles.playGame}>
          <SearchBar randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} scoreState={{score, setScore}} />
          <Button color='error' className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
        </div>
      </div>
      : null
  );
}

export default App;
