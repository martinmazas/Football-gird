import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import React from 'react';
import { useEffect, useState } from "react";
import { getPlayParams } from "./Utils/functions";
import CircularIndeterminate from "./CircularIndeterminate";
import SimpleDialogDemo from "./SimpleDialogDemo";

const styles = {
  app: {
  },
  button: {
    fontSize: '30px',
  },
  playGame: {
    margin: '2% 40%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    maxWidth: '830px'
  },
  grid: {
    margin: '0 35vw',
    backgroundColor: 'green'
  },
  waiting: {
    width: '80vw',
    height: '20vh',
    margin: 'auto',
  }
}

function App() {
  const handleClick = () => {
    window.location.reload()
  }

  const [score, setScore] = useState(0)
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)
  const [countryNames, setCountryNames] = useState([])
  const [teamNames, setTeamNames] = useState([])
  const [finalResult, setFinalResult] = useState('')
  const [nonPlayers, setNonPlayers] = useState([])

  // When application starts
  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (score === finalResult) alert('You won')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score])

  return (
    // Wait until finalResult and nonPlayers is ready
    (finalResult && nonPlayers) ?
      <div className="App" style={styles.app}>
        <GridTable style={styles.grid} rows={rows} columns={columns} countryNames={countryNames} teamNames={teamNames} nonPlayers={nonPlayers} />
        <div className="play-game" style={styles.playGame}>
          <SimpleDialogDemo scoreState={{ score, setScore }} />
          <Button color='error' className="restart-button" style={styles.button} onClick={handleClick} variant="contained">Restart</Button>
        </div>
      </div >
      : <CircularIndeterminate />
  );
}

export default App;
