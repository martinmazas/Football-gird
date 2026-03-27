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

export type ResponsiveImageProps = {
  id?: string;
  src: string;
  alt: string;
  roundedBorder?: boolean;
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

export type PlayerProps = {
  first_name: string;
  second_name: string;
  imgPath: string;
  country: string;
  team: string;
  isSuggestion?: boolean;
};