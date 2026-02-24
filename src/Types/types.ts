export type Country = {
  name: string;
  code?: string;
};

export type Team = {
  name: string;
  code?: string;
  url?: string;
};

export type CountryFlagProps = {
  country: Country;
};

export type GameParams = {
  countries: Country[];
  teams: Team[];
};

export type GridTableProps = CounterProps & {
  gameParams: GameParams;
  guessedPlayers: Record<string, PlayerProps>;
};

export type ResponsiveImageProps = {
  id?: string;
  src: string;
  alt: string;
  roundedBorder?: boolean;
};

export type CounterProps = {
  endGame: boolean;
  count: number;
  incrementCount: () => void;
};

export type RenderCellProps = CounterProps & {
  teams: Team[];
  countries: Country[];
  rowIndex: number;
  cellIndex: number;
  guessedPlayers: Record<string, PlayerProps>;
};

export type WinnerDialogProps = {
  handleRestartButton: () => void;
  count: number;
  setEndGame: (value: boolean) => void;
};

export type Tournament = {
  img?: string;
  name?: string;
  id?: string;
};

export type TournamentCardProps = {
  tournament: Tournament;
  onCardClick: (tournament: Tournament) => void;
};

export type GuessPlayerProps = {
  playerName: string;
  setIsError: (msg: string | false) => void;
  combinations: string[] | false;
  setCombinations: React.Dispatch<React.SetStateAction<string[] | false>>;
  tournament: string | null;
  setGuessedPlayers: React.Dispatch<React.SetStateAction<Record<string, PlayerProps>>>;
};

export type PlayerProps = {
  second_name: string;
  imgPath: string;
  country: string;
  team: string;
};

export type GameOptionsProps = {
  handleRestartButton: () => void;
  setIsError: (msg: string | false) => void;
  combinations: string[] | false;
  setCombinations: React.Dispatch<React.SetStateAction<string[] | false>>;
  tournament: string | null;
  setGuessedPlayers: React.Dispatch<React.SetStateAction<Record<string, PlayerProps>>>;
};