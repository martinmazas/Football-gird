import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';
import Counter from './Counter';
import './Styles/index.css'
import { GridTableProps, RenderCellProps } from './Types/types';

const renderCellContent = ({rowIndex, cellIndex, countries, teams, endGame, count, incrementCount}: RenderCellProps) => {
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
        return (
            <div className={`grid-place-${cellKey}`} />
        );
    }
    return null;
};

export default function Cells({ gameParams, endGame, count, incrementCount } : GridTableProps) {
    const { countries, teams } = { ...gameParams }
    const len = teams.length

    return (
        <tbody>
            {Array.from({ length: len + 1 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: len + 1 }, (_, cellIndex) => (
                        <td className={`td-cell ${rowIndex}-${cellIndex}`} key={`${rowIndex}-${cellIndex}`}>
                            {renderCellContent({rowIndex, cellIndex, countries, teams, endGame, count, incrementCount})}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}