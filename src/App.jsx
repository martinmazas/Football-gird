import React, { useEffect, useState } from "react";
import GridTable from "./gridTable";
import Button from '@mui/material/Button';
import { getPlayParams } from "./Utils/functions";
import CircularIndeterminate from "./CircularIndeterminate";
import SimpleDialogDemo from "./SimpleDialogDemo";
import './index.css';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Container from '@mui/material/Container';
import Confetti from 'react-confetti';
import WinnerDialog from "./WinnerDialog";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const styles = {
  howToPlay: {
    margin: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    borderRadius: '3rem',
  }
};

function App() {
  const [startPlay, setStartPlay] = useState(false) // Variable that indicates a new game
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0); // Quantity of rows
  const [columns, setColumns] = useState(0); // Quantity of columns
  const [countries, setCountries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [finalResult, setFinalResult] = useState(null); // Final objective of the player
  const [nonPlayers, setNonPlayers] = useState([]); // Helper variable in case there is one or more cells that are not in use
  const [endGame, setEndGame] = useState(false); // Flag for the game end
  const [isError, setIsError] = useState(false); // Flag for error in search player
  const [openModal, setOpenModal] = useState(true); // Variable that works for intro slides
  const [count, setCount] = useState(0) // Variable that works as a time counter

  // Reset all the variables in order to prepare the new board
  const startGame = () => {
    setScore(0)
    setCount(0)
    setFinalResult(null);
    setNonPlayers([]);
    setEndGame(false);
    setIsError(false);
  };

  const handleClick = () => {
    setStartPlay(!startPlay);
  };

  // When application starts
  useEffect(() => {
    // New game
    startGame();

    // Request new params from server
    getPlayParams()
      .then(data => {
        const { rows, columns, randomTeams, randomCountries, playerNumbers, noPossiblePlayers } = { ...data }

        // Set columns, rows and the total players to guess
        setRows(rows);
        setColumns(columns);
        setFinalResult(playerNumbers);

        // Set the country-team combination where there is no option
        if (noPossiblePlayers.length) {
          noPossiblePlayers[0].map(player =>
            setNonPlayers(nonPlayers => [...nonPlayers, player.join('-')])
          );
        }

        // Set teams and countries
        setTeams([...randomTeams])
        setCountries([...randomCountries])

        setTeamNames(() => randomTeams.map(team => team.name))
        setCountryNames(() => randomCountries.map(country => country.name))
      });
  }, [startPlay]);

  useEffect(() => {
    if (score === finalResult) setEndGame(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    if (!openModal) setCount(0)
  }, [openModal])


  return (
    // Wait until finalResult and nonPlayers is ready
    (finalResult && nonPlayers) ?
      <Container maxWidth='sm' className="App">
        <GridTable rows={rows} columns={columns} countries={countries} teams={teams} nonPlayers={nonPlayers} endGame={endGame} count={count} setCount={setCount} openModal={openModal} />
        <Container maxWidth='sm' id="play-game">
          <SimpleDialogDemo setScore={setScore} countryNames={countryNames} teamNames={teamNames} isError={isError} setIsError={setIsError} />
          <Button size="small" id="restart-button" onClick={handleClick} variant="contained"><RestartAltIcon sx={{ color: '#fff' }} /></Button>
        </Container>
        {isError && <div id="error-message"><p>{isError}</p></div>}
        {endGame && <Confetti />}
        <Dialog
          className="how-to-play-title"
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="how-to-play-title"
          maxWidth="sm"
          fullWidth
          PaperProps={{ style: styles.howToPlay }}
        >
          <DialogContent>
            <SwipeableTextMobileStepper setOpenModal={setOpenModal} setEndGame={setEndGame} />
          </DialogContent>
        </Dialog>
        <WinnerDialog endGame={endGame} setEndGame={setEndGame} setStartPlay={setStartPlay} count={count} />
      </Container>
      : <CircularIndeterminate />
  );
}

export default App;
