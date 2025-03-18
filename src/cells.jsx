import React from 'react';
import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';
import Counter from './Counter';
import './Styles/index.css'

const renderCellContent = (rowIndex, cellIndex, countries, teams, endGame, count, incrementCount) => {
    // Counter on 0,0
    if (rowIndex === 0 && cellIndex === 0) {
        return <Counter endGame={endGame} count={count} incrementCount={incrementCount} />
    }

    // Countries on x-axis
    if (rowIndex === 0 && cellIndex > 0) {
        return <CountryFlag country={countries[cellIndex - 1]} cellIndex={cellIndex} />;
    }
    // Teams on y-axis
    if (cellIndex === 0 && rowIndex > 0) {
        return <TeamFlag team={teams[rowIndex - 1]} rowIndex={rowIndex} />;
    }
    // Players
    if (cellIndex !== 0 && rowIndex !== 0) {
        const cellKey = `${countries[cellIndex - 1].name}-${teams[rowIndex - 1].name}`;

        return (
            <div className={`grid-place-${cellKey}`}></div>
        );
    }
    return null;
};

export default function Cells({ props }) {
    const { gameParams, endGame, count, incrementCount } = props
    const { rows, columns, countries, teams } = { ...gameParams }

    return (
        <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: columns }, (_, cellIndex) => (
                        <td className={`${rowIndex}-${cellIndex}`} id='td-cell' key={`${rowIndex}-${cellIndex}`}>
                            {renderCellContent(rowIndex, cellIndex, countries, teams, endGame, count, incrementCount)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
