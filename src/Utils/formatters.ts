export const cleanTournamentName = (tournament: string | null) =>
  (tournament ?? "")
    .toUpperCase()
    .replace(/\s\d+(\/*\d+)?/, "")
    .trim();
