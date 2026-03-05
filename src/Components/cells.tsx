import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';
import Counter from './Counter';
import ResponsiveImage from './ResponsiveImage';
import { Country, GameParams, Team, PlayerProps } from '../Types/types';
import { useGameContext } from '../Context/GameContext';

type CellsProps = {
    gameParams: GameParams;
};

type RenderCellArgs = {
    rowIndex: number;
    cellIndex: number;
    countries: Country[];
    teams: Team[];
    guessedPlayers: Record<string, PlayerProps>;
};

const renderCellContent = ({ rowIndex, cellIndex, countries, teams, guessedPlayers }: RenderCellArgs) => {
    // Counter on 0,0 — reads endGame/count/incrementCount from context internally
    if (rowIndex === 0 && cellIndex === 0) {
        return <Counter />
    }
    // Countries on x-axis
    if (rowIndex === 0 && cellIndex > 0) {
        return <CountryFlag country={countries[cellIndex - 1]} />
    }
    // Teams on y-axis
    if (cellIndex === 0 && rowIndex > 0) {
        return <TeamFlag team={teams[rowIndex - 1]} />
    }
    // Players
    if (cellIndex !== 0 && rowIndex !== 0) {
        const cellKey = `${countries[cellIndex - 1].name}-${teams[rowIndex - 1].name}`
        const guessedPlayer = guessedPlayers[cellKey];
        if (guessedPlayer) {
            const img = require(`../images/Players/24-25/${guessedPlayer.imgPath.trim()}.webp`);
            return (
                <div className="player-appear">
                    <ResponsiveImage src={img} alt={guessedPlayer.second_name} roundedBorder={true} />
                </div>
            );
        }
        return <div className={`grid-place-${cellKey}`} />;
    }
    return null;
};

export default function Cells({ gameParams }: CellsProps) {
    const { guessedPlayers } = useGameContext();
    const { countries, teams } = gameParams;
    const len = teams.length;

    return (
        <tbody>
            {Array.from({ length: len + 1 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: len + 1 }, (_, cellIndex) => (
                        <td className={`td-cell ${rowIndex}-${cellIndex}`} key={`${rowIndex}-${cellIndex}`}>
                            {renderCellContent({ rowIndex, cellIndex, countries, teams, guessedPlayers })}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}