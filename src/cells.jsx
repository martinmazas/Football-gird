import React from 'react';
import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';
import CloseIcon from '@mui/icons-material/Close';
import Counter from './Counter';
import './index.css'

const renderCellContent = (rowIndex, cellIndex, countries, teams, nonPlayers, endGame, count, incrementCount, openModal) => {
    // Counter on 0,0
    if (rowIndex === 0 && cellIndex === 0) {
        return <Counter endGame={endGame} count={count} incrementCount={incrementCount} openModal={openModal} />
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
            <div className={cellKey}>
                {nonPlayers.includes(cellKey) && <CloseIcon fontSize="large" color="error" />}
            </div>
        );
    }
    return null;
};

export default function Cells({ props }) {
    const { rows, columns, countries, teams, nonPlayers, endGame, count, incrementCount, openModal } = props;

    return (
        <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: columns }, (_, cellIndex) => (
                        <td className={`${rowIndex}-${cellIndex}`} id='td-cell' key={`${rowIndex}-${cellIndex}`}>
                            {renderCellContent(rowIndex, cellIndex, countries, teams, nonPlayers, endGame, count, incrementCount, openModal)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
