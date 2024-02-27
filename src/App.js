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
    // height: '40px',
    fontSize: '30px',
  },
  playGame: {
    whiteSpace: 'nowrap',
    margin: 'auto 35vw',
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

    useEffect(() => {
        const randomCountries = getRandomNumbers(rows, countries)
        const randomTeams = getRandomNumbers(columns, teams)

        setRandomNumbersCountries(randomCountries)
        setRandomNumbersTeams(randomTeams)
    }, [])

  return (
    <div className="App">
      <GridTable rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} />
      <div className="play-game" style={styles.playGame}>
        <SearchBar randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} />
        <Button color='error' className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
      </div>
    </div>
  );
}

export default App;
