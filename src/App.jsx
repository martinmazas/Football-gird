import React, { useMemo, useEffect, useState, useCallback } from "react";
import GridTable from "./gridTable";
import { getPlayParams } from "./Utils/functions";
import './index.css';
import Container from '@mui/material/Container';
import Confetti from 'react-confetti';
import WinnerDialog from "./WinnerDialog";
import GameOptions from "./GameOptions";
import { useCounter } from "./Hooks/useCounter";
import { useLocation, useNavigate } from "react-router-dom";
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

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tournament = searchParams.get("tournament");

  const [startPlay, setStartPlay] = useState(false);
  const [score, setScore] = useState(0);
  const [gameParams, setGameParams] = useState(INITIAL_GAME_PARAMS);
  const [finalResult, setFinalResult] = useState(null);
  const [endGame, setEndGame] = useState(false)
  const [isError, setIsError] = useState(false);
  const { count, incrementCount, resetCounter } = useCounter(0);

  const startGame = useCallback(() => {
    setScore(0);
    resetCounter();
    setGameParams(INITIAL_GAME_PARAMS);
    setEndGame(false);
    setIsError(false);
  }, [resetCounter, setEndGame]);

  const handleClick = useCallback(() => setStartPlay((prev) => !prev), []);

  useEffect(() => {
    if (tournament) {
      startGame();
      getPlayParams(tournament).then((data) => {
        const { rows, columns, randomTeams, randomCountries } = data;
        setGameParams({
          rows,
          columns,
          countries: randomCountries,
          teams: randomTeams,
        });
        setFinalResult((rows - 1) * (columns - 1));
      });
    }
  }, [startPlay, tournament, startGame]);

  const memoizedGameParams = useMemo(() => ({
    rows: gameParams.rows,
    columns: gameParams.columns,
    countries: gameParams.countries,
    teams: gameParams.teams,
  }), [gameParams]);

  // Check if the player won the game
  useEffect(() => {
    if (score === finalResult) setEndGame(true);
  }, [score, finalResult, setEndGame]);

  return (
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

      {memoizedGameParams.rows > 0 && (
        <>
          <GridTable
            gameParams={memoizedGameParams}
            endGame={endGame}
            count={count}
            incrementCount={incrementCount}
          />
          <GameOptions
            handleScore={() => setScore(score + 1)}
            countries={memoizedGameParams.countries}
            teams={memoizedGameParams.teams}
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
          <WinnerDialog handleClick={handleClick} count={count} setEndGame={setEndGame} />
        </>
      )}
    </Container>
  );
};

export default App;