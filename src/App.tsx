import React, { useMemo, useEffect, useState, useCallback } from "react";
import GridTable from "./gridTable";
import { getPlayParams } from "./Utils/functions";
import "./Styles/index.css";
import Container from "@mui/material/Container";
import Confetti from "react-confetti";
import WinnerDialog from "./WinnerDialog";
import GameOptions from "./GameOptions";
import { useCounter } from "./Hooks/useCounter";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import BelowGameAd from "./Components/BelowGameAd";
import { Country, Team } from "./Types/types";
import StickyOutstreamFooter from "./Components/StickyOutstreamFooter";

interface GameParams {
  countries: Country[];
  teams: Team[];
}

const INITIAL_GAME_PARAMS: GameParams = {
  countries: [],
  teams: [],
};

const App: React.FC = () => {
  const location = useLocation();
  const tournament: string | null = new URLSearchParams(location.search).get(
    "tournament"
  );

  const [startPlay, setStartPlay] = useState<boolean>(false);
  const [gameParams, setGameParams] = useState<GameParams>(INITIAL_GAME_PARAMS);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | false>(false);
  const [combinations, setCombinations] = useState<string[] | false>(false);
  const { count, incrementCount, resetCounter } = useCounter(0);

  const startGame = useCallback(() => {
    resetCounter();
    setGameParams(INITIAL_GAME_PARAMS);
    setEndGame(false);
    setIsError(false);
  }, [resetCounter, setEndGame]);

  // Restart the game
  const handleRestartButton = useCallback(
    () => setStartPlay((prev) => !prev),
    []
  );

  useEffect(() => {
    startGame();
    getPlayParams(tournament).then((data) => {
      const { randomTeams, randomCountries } = data;
      setGameParams({
        countries: randomCountries,
        teams: randomTeams,
      });
      setCombinations(
        randomCountries.flatMap((country: Country) =>
          randomTeams.map((team: Team) => `${country.name}-${team.name}`)
        )
      );
    });
  }, [startPlay, tournament, startGame]);

  const memoizedGameParams = useMemo(
    () => ({
      countries: gameParams.countries,
      teams: gameParams.teams,
    }),
    [gameParams]
  );

  // Check if the player won the game
  useEffect(() => {
    if (Array.isArray(combinations) && combinations.length === 0)
      setEndGame(true);
  }, [combinations]);

  return (
    <>
      <Container
        className="App-container"
        maxWidth="xs"
        sx={{
          position: "relative",
          paddingTop: { xs: "4rem", sm: "3rem", md: "2rem" },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: { xs: 3, md: 4 },
        }}
      >
        {/* Main Grid Table */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
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
            width: "100%",
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
        {isError && (
          <div id="error-message">
            <p style={{ margin: 0 }}>{isError}</p>
          </div>
        )}
        <StickyOutstreamFooter
          tournament={tournament ?? undefined}
          showDelayMs={3500} // or render conditionally after game over
          onDisplayed={() => console.log("Video sticky displayed")}
          onClose={() => console.log("Video sticky closed")}
        />
        <BelowGameAd tournament={tournament} />
      </Container>

      {endGame && (
        <>
          <Confetti />
          <WinnerDialog
            handleRestartButton={handleRestartButton}
            count={count}
            setEndGame={setEndGame}
          />
        </>
      )}
    </>
  );
};

export default App;
