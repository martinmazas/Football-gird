import React, { useMemo, useEffect, useState, useCallback } from "react";
import GridTable from "./Components/gridTable";
import { getPlayParams } from "./Utils/functions";
import Container from "@mui/material/Container";
import Confetti from "react-confetti";
import WinnerDialog from "./Components/WinnerDialog";
import GameOptions from "./Components/GameOptions";
import { useCounter } from "./Hooks/useCounter";
import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BelowGameAd from "./Components/BelowGameAd";
import HeaderAd from "./Components/HeaderAd";
import { Country, GameParams, PlayerProps, Team } from "./Types/types";

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
  const [guessedPlayers, setGuessedPlayers] = useState<Record<string, PlayerProps>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { count, incrementCount, resetCounter } = useCounter(0);

  const startGame = useCallback(() => {
    resetCounter();
    setGameParams(INITIAL_GAME_PARAMS);
    setEndGame(false);
    setIsError(false);
    setGuessedPlayers({});
    setIsLoading(true);
  }, [resetCounter, setEndGame]);

  // Restart the game
  const handleRestartButton = useCallback(
    () => setStartPlay((prev) => !prev),
    []
  );

  useEffect(() => {
    startGame();
    getPlayParams(tournament)
      .then((data) => {
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
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setIsError(err.message);
        setIsLoading(false);
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

  // Auto-dismiss error messages
  useEffect(() => {
    if (!isError) return;
    const timer = setTimeout(() => setIsError(false), 2500);
    return () => clearTimeout(timer);
  }, [isError]);

  return (
    <>
      <Container
        className="App-container"
        maxWidth="md"
        sx={{
          position: "relative",
          paddingTop: { xs: "5rem", sm: "3.5rem", md: "3rem" },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: { xs: 3, md: 4 },
        }}
      >
        <HeaderAd />

        {/* Main Grid Table */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            px: { xs: 1, sm: 2 },
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "280px",
              }}
            >
              <CircularProgress size={56} sx={{ color: "#f2b705" }} />
            </Box>
          ) : (
            <GridTable
              gameParams={memoizedGameParams}
              endGame={endGame}
              count={count}
              incrementCount={incrementCount}
              guessedPlayers={guessedPlayers}
            />
          )}
        </Box>

        {/* Progress indicator */}
        {!isLoading && gameParams.countries.length > 0 && (
          <Box sx={{ width: "100%", maxWidth: "sm", px: { xs: 2, sm: 4 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.75,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}
              >
                Progress
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#f2b705", fontWeight: 700 }}
              >
                {Object.keys(guessedPlayers).length} /{" "}
                {gameParams.countries.length * gameParams.teams.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={
                (Object.keys(guessedPlayers).length /
                  (gameParams.countries.length * gameParams.teams.length)) *
                100
              }
              sx={{
                borderRadius: 4,
                height: 6,
                backgroundColor: "rgba(255,255,255,0.08)",
                "& .MuiLinearProgress-bar": { backgroundColor: "#f2b705" },
              }}
            />
          </Box>
        )}

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
            setGuessedPlayers={setGuessedPlayers}
          />
        </Box>

        {/* Error Message */}
        {isError && (
          <div id="error-message">
            <p style={{ margin: 0 }}>{isError}</p>
          </div>
        )}
        <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
          <BelowGameAd tournament={tournament} />
        </Box>
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
