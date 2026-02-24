import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';
import Counter from './Counter';
import ResponsiveImage from './ResponsiveImage';
import './Styles/index.css'
import { GridTableProps, RenderCellProps } from './Types/types';

const renderCellContent = ({rowIndex, cellIndex, countries, teams, endGame, count, incrementCount, guessedPlayers}: RenderCellProps) => {
    // Counter on 0,0
    if (rowIndex === 0 && cellIndex === 0) {
        return <Counter endGame={endGame} count={count} incrementCount={incrementCount} />
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
            const img = require(`./images/Players/24-25/${guessedPlayer.imgPath.trim()}.webp`);
            return <ResponsiveImage src={img} alt={guessedPlayer.second_name} roundedBorder={true} />;
        }
        return <div className={`grid-place-${cellKey}`} />;
    }
    return null;
};

export default function Cells({ gameParams, endGame, count, incrementCount, guessedPlayers } : GridTableProps) {
    const { countries, teams } = { ...gameParams }
    const len = teams.length

    return (
        <tbody>
            {Array.from({ length: len + 1 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: len + 1 }, (_, cellIndex) => (
                        <td className={`td-cell ${rowIndex}-${cellIndex}`} key={`${rowIndex}-${cellIndex}`}>
                            {renderCellContent({rowIndex, cellIndex, countries, teams, endGame, count, incrementCount, guessedPlayers})}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}