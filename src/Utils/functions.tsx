import axios from "axios";
import ResponsiveImage from "../ResponsiveImage";
import { createRoot } from "react-dom/client";
import { cleanTournamentName } from "./formatters";
import { GuessPlayerProps, PlayerProps } from "../Types/types";
const server =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_SERVER
    : "http://localhost:8080";

const axiosConfig: { headers: Record<string, string> } = {
  headers: {
    "Content-Type": "application/json",
  },
};

const setTournamentHeader = (tournament: string | null) => {
  tournament = cleanTournamentName(tournament);
  axiosConfig.headers["tournament"] = tournament;
};

const handleError = (err: Error, customMessage?: string): never => {
  const message = customMessage || err.message || "An error occurred";
  console.error(message, err);
  throw new Error(message);
};

export const getPlayParams = async (tournament: string | null) => {
  // Request from the back the teams and countries for the specific tournament
  setTournamentHeader(tournament);
  try {
    const { data } = await axios.get(`${server}/api/parameters`, {
      ...axiosConfig,
    });
    return data;
  } catch (err: any) {
    handleError(err, "Failed to fetch play parameters");
  }
};

export const getPlayer = async (
  playerName: string,
  tournament: string | null
) => {
  try {
    setTournamentHeader(tournament);
    const { data } = await axios.get(`${server}/api/players/options`, {
      ...axiosConfig,
      params: {
        playerName,
      },
    });
    return data;
  } catch (err: any) {
    handleError(err, "Failed to fetch player options");
  }
};

export const guessPlayer = async ({
  playerName,
  setIsError,
  combinations,
  setCombinations,
  tournament,
}: GuessPlayerProps) => {
  try {
    setTournamentHeader(tournament);
    const { data } = await axios.get(`${server}/api/players/guess`, {
      ...axiosConfig,
      params: {
        playerName,
        combinations,
      },
    });

    if (data === "Player not found") {
      setIsError(`No place for ${playerName}`);
    } else {
      data.forEach((player: PlayerProps) => {
        const playerCombination = `${player.country}-${player.team}`;
        addPhoto(player, playerCombination);

        setCombinations((prevCombinations) => {
          if (!Array.isArray(prevCombinations)) return prevCombinations;

          const removeCombinationIndex =
            prevCombinations.indexOf(playerCombination);
          return prevCombinations.filter(
            (_, index) => index !== removeCombinationIndex
          );
        });
      });
    }
  } catch (err: any) {
    handleError(err, "Failed to guess player");
  }
};

export const addPhoto = (player: PlayerProps, playerCombination: string) => {
  if (!player) return;

  try {
    const playerDiv = document.getElementsByClassName(
      `grid-place-${playerCombination}`
    );

    if (playerDiv[0]) {
      const img = require(`../images/Players/24-25/${player.imgPath.trim()}.webp`);
      // const img = new URL(`../images/Players/24-25/${player.imgPath.trim()}.webp`, import.meta.url).href;
      const parentDiv = playerDiv[0].parentNode as HTMLElement;

      createRoot(parentDiv).render(
        <ResponsiveImage
          src={img}
          alt={player.second_name}
          roundedBorder={true}
        />
      );

      parentDiv.removeChild(playerDiv[0]);
    } else {
      console.log("Unexpected error");
    }
  } catch (err: any) {
    handleError(err, "Error while adding player photo");
  }
};
