import React, { useEffect, useState, useTransition, useCallback } from "react";
import GridTable from "./gridTable";
import { getPlayParams } from "./Utils/functions";
import './index.css';
import Container from '@mui/material/Container';
import Confetti from 'react-confetti';
import WinnerDialog from "./WinnerDialog";
import GameOptions from "./GameOptions";
import { useCounter } from "./Hooks/useCounter";
import { useLocation, useNavigate } from "react-router-dom";
import { useEndGame } from "./Hooks/endGame";
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from "@mui/material";

const INITIAL_GAME_PARAMS = {
  rows: 0,
  columns: 0,
  countries: [],
  teams: [],
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tournament = searchParams.get("tournament");

  const [startPlay, setStartPlay] = useState(false);
  const [score, setScore] = useState(0);
  const [gameParams, setGameParams] = useState(INITIAL_GAME_PARAMS);
  const [finalResult, setFinalResult] = useState(null);
  const { endGame, setEndGame } = useEndGame();
  const [isError, setIsError] = useState(false);
  const { count, incrementCount, resetCounter } = useCounter(0);
  const [isPending, startTransition] = useTransition();

  const startGame = useCallback(() => {
    setScore(0);
    resetCounter();
    setGameParams(INITIAL_GAME_PARAMS);
    setEndGame(false);
    setIsError(false);
    // eslint-disable-next-line
  }, [resetCounter]);

  const handleClick = () => setStartPlay((prev) => !prev);

  useEffect(() => {
    if (tournament) {
      startGame();
      getPlayParams(tournament).then((data) => {
        startTransition(() => {
          const { rows, columns, randomTeams, randomCountries, playerNumbers } = data;
          setGameParams({
            rows,
            columns,
            countries: randomCountries,
            teams: randomTeams,
          });
          setFinalResult(playerNumbers);
        });
      });
    }
  }, [startPlay, tournament, startGame]);

  useEffect(() => {
    if (score === finalResult) setEndGame(true);
    // eslint-disable-next-line
  }, [score, finalResult]);

  return (
    !isPending &&
    <Container className="App-container">
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
          padding: "0.5rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            transform: "translateX(-50%) scale(1.1)",
          }
        }}
      >
        <IconButton onClick={() => navigate("/")} sx={{ color: "white" }}>
          <HomeIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Box>

      {gameParams.rows > 0 && (
        <>
          <GridTable
            gameParams={gameParams}
            endGame={endGame}
            count={count}
            incrementCount={incrementCount}
          />
          <GameOptions
            handleScore={() => setScore(score + 1)}
            countries={gameParams.countries}
            teams={gameParams.teams}
            isError={isError}
            setIsError={setIsError}
            handleClick={handleClick}
          />
        </>
      )}

      {isError && <div id="error-message"><p>{isError}</p></div>}

      {endGame && (
        <>
          <Confetti />
          <WinnerDialog handleClick={handleClick} count={count} />
        </>
      )}
    </Container>
  );
};

export default App;