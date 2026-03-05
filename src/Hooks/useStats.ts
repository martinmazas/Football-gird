const STATS_KEY = "football-grid-stats";

type TournamentStats = {
  distribution: number[]; // index 0–9: games completed with that many correct guesses
  gamesPlayed: number;
};

export type AllStats = Record<string, TournamentStats>;

export function useStats() {
  const getAll = (): AllStats => {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const saveResult = (tournament: string, correctGuesses: number) => {
    const all = getAll();
    const current: TournamentStats = all[tournament] ?? {
      distribution: Array(10).fill(0),
      gamesPlayed: 0,
    };
    const idx = Math.min(Math.max(correctGuesses, 0), 9);
    current.distribution[idx]++;
    current.gamesPlayed++;
    all[tournament] = current;
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(all));
    } catch {
      console.warn("Could not save stats to localStorage");
    }
  };

  return { saveResult, getAll };
}
