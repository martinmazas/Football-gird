import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';
import { useEffect, useState } from "react";
import { getPlayParams } from "./Utils/functions";
import CircularIndeterminate from "./CircularIndeterminate";
import SimpleDialogDemo from "./SimpleDialogDemo";
import './index.css'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Container from '@mui/material/Container';

const styles = {
  app: {
    // width: '30rem',
    margin: 'auto',
  },
  playGame: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '1rem',
  }
}

function App() {

  const [startPlay, setStartPlay] = useState(0)
  const [score, setScore] = useState(0)
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)
  const [countryNames, setCountryNames] = useState([])
  const [teamNames, setTeamNames] = useState([])
  const [finalResult, setFinalResult] = useState(null)
  const [nonPlayers, setNonPlayers] = useState([])

  const startGame = () => {
    setScore(0)
    setRows(0)
    setColumns(0)
    setCountryNames([])
    setTeamNames([])
    setFinalResult(null)
    setNonPlayers([])
  }

  const handleClick = () => {
    setStartPlay(startPlay => startPlay + 1)
  }

  // When application starts
  useEffect(() => {
    startGame()

    getPlayParams()
      .then(data => {
        const { gridRows, gridColumns, teams, countries, playerNumber, noPossiblePlayerList } = { ...data }

        // Set columns, rows and the total players to guess
        setRows(gridRows)
        setColumns(gridColumns)
        setFinalResult(playerNumber)

        // Set the country-team combination where there is no option
        noPossiblePlayerList[0].map(player =>
          setNonPlayers(nonPlayers => [...nonPlayers, player.join('-')])
        )

        // Set teams and countries
        teams[0].map(team =>
          setTeamNames(teamNames => [...teamNames, team])
        )
        countries[0].map(country =>
          setCountryNames(countryNames => [...countryNames, country])
        )
      })
  }, [startPlay])

  useEffect(() => {
    if (score === finalResult) alert('You won')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score])

  return (
    // Wait until finalResult and nonPlayers is ready
    (finalResult && nonPlayers) ?
      <Container maxWidth='sm' className="App" sx={styles.app}>
        <GridTable rows={rows} columns={columns} countryNames={countryNames} teamNames={teamNames} nonPlayers={nonPlayers} />
        <Container className="play-game" style={styles.playGame}>
          <SimpleDialogDemo setScore={setScore} countryNames={countryNames} teamNames={teamNames} />
          <Button size="small" id="restart-button" onClick={handleClick} variant="contained"><RestartAltIcon sx={{ color: '#fff' }} /></Button>
        </Container>
      </Container >
      : <CircularIndeterminate />
  );
}

export default App;
