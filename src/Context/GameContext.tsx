import React, { createContext, useContext } from "react";
import { PlayerProps } from "../Types/types";

type GameContextType = {
  // Used by PlayerSearch (was drilled: App → GameOptions → PlayerSearch)
  combinations: string[] | false;
  setCombinations: React.Dispatch<React.SetStateAction<string[] | false>>;
  setIsError: (msg: string | false) => void;
  tournament: string | null;
  setGuessedPlayers: React.Dispatch<React.SetStateAction<Record<string, PlayerProps>>>;

  // Used by Cells (was drilled: App → GridTable → Cells)
  guessedPlayers: Record<string, PlayerProps>;

  // Used by Counter (was drilled: App → GridTable → Cells → Counter)
  endGame: boolean;
  count: number;
  incrementCount: () => void;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used inside <GameContext.Provider>");
  return ctx;
}
