import React, { useEffect, useState, useTransition } from "react";
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
  const [startPlay, setStartPlay] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [countries, setCountries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [nonPlayers, setNonPlayers] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [count, setCount] = useState(0);

  // For handling transitions
  const [isPending, startTransition] = useTransition();

  // Reset all the variables to prepare for a new game
  const startGame = () => {
    setScore(0);
    setCount(0);
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
    // Reset the game
    startGame();

    // Request new parameters from server
    getPlayParams().then(data => {
      // Wrap the state updates in startTransition for smooth updates
      startTransition(() => {
        const { rows, columns, randomTeams, randomCountries, playerNumbers, noPossiblePlayers } = data;

        setRows(rows);
        setColumns(columns);
        setFinalResult(playerNumbers);

        if (noPossiblePlayers.length) {
          noPossiblePlayers[0].forEach(player =>
            setNonPlayers(prevNonPlayers => [...prevNonPlayers, player.join('-')])
          );
        }

        setTeams([...randomTeams]);
        setCountries([...randomCountries]);
      });
    });
  }, [startPlay]);

  useEffect(() => {
    if (score === finalResult) setEndGame(true);
  }, [score, finalResult]);

  useEffect(() => {
    if (!openModal) setCount(0);
  }, [openModal]);

  return (
    // Show loading spinner while in transition
    isPending ? <CircularIndeterminate /> : (
      <Container maxWidth='sm' className="App">
        <GridTable rows={rows} columns={columns} countries={countries} teams={teams} nonPlayers={nonPlayers} endGame={endGame} count={count} setCount={setCount} openModal={openModal} />
        <Container maxWidth='sm' id="play-game">
          <SimpleDialogDemo setScore={setScore} countries={countries} teams={teams} isError={isError} setIsError={setIsError} />
          <Button size="small" id="restart-button" onClick={handleClick} variant="contained">
            <RestartAltIcon sx={{ color: '#fff' }} />
          </Button>
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
    )
  );
}

export default App;
