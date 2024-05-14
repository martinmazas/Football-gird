import SearchBar from "./SearchBar";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';
import { useEffect, useState } from "react";
import { getRandomNumbers, getTeams } from "./Utils/functions";
import countries from './countries.json'
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
  const [score, setScore] = useState(0)
  const [countryNames, setCountryNames] = useState([])
  const [teamNames, setTeamNames] = useState([])
  const [finalResult, setFinalResult] = useState('')
  const [nonPlayers, setNonPlayers] = useState([])

  useEffect(() => {
    getTeams()
    .then(data => {
      const teams = [...data]
      teams[0].map(team => {
        setTeamNames(teamNames => [...teamNames, team])})
    })
    const randomCountries = getRandomNumbers(rows, countries)

    setRandomNumbersCountries(randomCountries)
  }, [])

  useEffect(() => {
    randomNumbersCountries.map(country => setCountryNames(countryNames => [...countryNames, countries[country].name]))
  }, [randomNumbersCountries])


  useEffect(() => {
    if (countryNames.length && teamNames.length) getFinalResult(countryNames, teamNames, setFinalResult, setNonPlayers)
  }, [countryNames, teamNames])

  useEffect(() => {
    if (score === finalResult) alert('You won')
  }, [score], setTimeout(1200))

  return (
    (finalResult && nonPlayers) ?
      <div className="App">
        <GridTable style={styles.grid} rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} teamNames={teamNames} nonPlayers={nonPlayers} />
        <div className="play-game" style={styles.playGame}>
          <SearchBar scoreState={{ score, setScore }} />
          <Button color='error' className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
        </div>
      </div >
      : <CircularIndeterminate />
  );
}

export default App;
