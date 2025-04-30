import React, { useMemo, useEffect, useState, useCallback } from "react";
import GridTable from "./gridTable";
import { getPlayParams } from "./Utils/functions";
import './Styles/index.css';
import Container from '@mui/material/Container';
import Confetti from 'react-confetti';
import WinnerDialog from "./WinnerDialog";
import GameOptions from "./GameOptions";
import { useCounter } from "./Hooks/useCounter";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import tournamentAdSlots from "./Components/TournamentAd";
import TournamentAd from "./Components/TournamentAd";

const INITIAL_GAME_PARAMS = {
  countries: [],
  teams: [],
};

const App = () => {
  const location = useLocation()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tournament = searchParams.get("tournament");
  const slotId = tournamentAdSlots[tournament]

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
        maxWidth="xs"
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
            tournament={tournament}
          />
        </Box>

        {/* Error Message */}
        {isError && <div id="error-message"><p style={{ margin: 0 }}>{isError}</p></div>}
        <TournamentAd slotId={slotId} />
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