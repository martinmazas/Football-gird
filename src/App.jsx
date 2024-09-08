import React, { useEffect, useState, useTransition } from "react";
import GridTable from "./gridTable";
import { getPlayParams } from "./Utils/functions";
import CircularIndeterminate from "./CircularIndeterminate";
import './index.css';
import Container from '@mui/material/Container';
import Confetti from 'react-confetti';
import WinnerDialog from "./WinnerDialog";
// import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
import GameOptions from "./GameOptions";
import GameInstructions from "./GameInstructions";

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
        <GameOptions setScore={setScore} countries={countries} teams={teams} isError={isError} setIsError={setIsError} handleClick={handleClick} />
        {isError && <div id="error-message"><p>{isError}</p></div>}
        {endGame && <Confetti />}
        <GameInstructions openModal={openModal} setOpenModal={setOpenModal} setEndGame={setEndGame} />
        <WinnerDialog endGame={endGame} setEndGame={setEndGame} setStartPlay={setStartPlay} count={count} />
      </Container>
    )
  );
}

export default App;
