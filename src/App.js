import SearchBar from "./SearchBar";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';
import { useEffect, useState } from "react";
import { getRandomNumbers } from "./Utils/functions";
import countries from './countries.json'
import teams from './teams.json'
import { getFinalResult } from "./Utils/functions";
import CircularIndeterminate from "./CircularIndeterminate";

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
  },
  waiting: {
    width: 1000,
    height: 100,
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
  const [countryNames, setCountryNames] = useState([])
  const [teamNames, setTeamNames] = useState([])
  const [finalResult, setFinalResult] = useState('')
  const [nonPlayers, setNonPlayers] = useState([])

  useEffect(() => {
    const randomCountries = getRandomNumbers(rows, countries)
    const randomTeams = getRandomNumbers(columns, teams)

    setRandomNumbersCountries(randomCountries)
    setRandomNumbersTeams(randomTeams)
  }, [])

  useEffect(() => {
    randomNumbersCountries.map(country => setCountryNames(countryNames => [...countryNames, countries[country].name]))
    randomNumbersTeams.map(team => setTeamNames(teamNames => [...teamNames, teams[team].name]))
  }, [randomNumbersCountries, randomNumbersTeams])


  useEffect(() => {
    if (countryNames.length && teamNames.length) getFinalResult(countryNames, teamNames, setFinalResult, setNonPlayers)
  }, [countryNames, teamNames])

  useEffect(() => {
    if (score === finalResult) alert('You won')
  }, [score], setTimeout(1200))

  return (
    (finalResult && nonPlayers) ?
      <div className="App">
        <GridTable style={styles.grid} rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} nonPlayers={nonPlayers} />
        <div className="play-game" style={styles.playGame}>
          <SearchBar scoreState={{ score, setScore }} />
          <Button color='error' className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
        </div>
      </div >
      : <CircularIndeterminate />
  );
}

export default App;
