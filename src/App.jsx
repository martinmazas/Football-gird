import React, { useMemo, useEffect, useState, useCallback } from "react";
import GridTable from "./gridTable";
import { getPlayParams } from "./Utils/functions";
import './Styles/index.css';
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
  countries: [],
  teams: [],
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tournament = searchParams.get("tournament");

  const [startPlay, setStartPlay] = useState(false);
  const [gameParams, setGameParams] = useState(INITIAL_GAME_PARAMS);
  const [endGame, setEndGame] = useState(false)
  const [isError, setIsError] = useState(false);
  const [combinations, setCombinations] = useState(false)
  const { count, incrementCount, resetCounter } = useCounter(0);

  const startGame = useCallback(() => {
    resetCounter();
    setGameParams(INITIAL_GAME_PARAMS);
    setEndGame(false);
    setIsError(false);
  }, [resetCounter, setEndGame]);

  // Restart the game
  const handleRestartButton = useCallback(() => setStartPlay((prev) => !prev), []);

  useEffect(() => {
    startGame();
    getPlayParams(tournament).then((data) => {
      const { randomTeams, randomCountries } = data;
      setGameParams({
        countries: randomCountries,
        teams: randomTeams,
      });
      setCombinations(randomCountries.flatMap(country => randomTeams.map(team => `${country.name}-${team.name}`))
      );
    });
  }, [startPlay, tournament, startGame]);

  const memoizedGameParams = useMemo(() => ({
    countries: gameParams.countries,
    teams: gameParams.teams,
  }), [gameParams]);

  // Check if the player won the game
  useEffect(() => {
    if (combinations.length === 0) setEndGame(true);
  }, [combinations]);

  return (
    <>
      <Container
        className="App-container"
        maxWidth="lg"
        sx={{
          position: 'relative',
          paddingTop: { xs: '4rem', sm: '3rem', md: '2rem' },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: '1rem', sm: '1.5rem', md: '2rem' },
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "50%",
            padding: "0.5rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              transform: "translateX(-50%) scale(1.1)",
            }
          }}
        >
          <IconButton onClick={() => navigate(-1)} sx={{ color: "white" }}>
            <HomeIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>

        {/* Main Grid Table */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '900px',
            display: 'flex',
            justifyContent: 'center',
            px: { xs: 1, sm: 2 },
          }}
        >
          <GridTable
            gameParams={memoizedGameParams}
            endGame={endGame}
            count={count}
            incrementCount={incrementCount}
          />
        </Box>

        {/* Game Options */}
        <Box
          sx={{
            width: '100%',
          }}
        >
          <GameOptions
            setIsError={setIsError}
            handleRestartButton={handleRestartButton}
            combinations={combinations}
            setCombinations={setCombinations}
          />
        </Box>

        {/* Error Message */}
        {isError && <div id="error-message"><p style={{ margin: 0 }}>{isError}</p></div>}
      </Container>

      {endGame && (
        <>
          <Confetti />
          <WinnerDialog handleRestartButton={handleRestartButton} count={count} setEndGame={setEndGame} />
        </>
      )}
    </>
  );
};

export default App;