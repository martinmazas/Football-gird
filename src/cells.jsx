import React from 'react';
import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';
import CloseIcon from '@mui/icons-material/Close';
import Counter from './Counter';

const styles = {
    td: {
        textAlign: 'center',
        backgroundColor: '#052031',
        border: '1px solid #0096a9',
        height: '5rem',
        width: '5rem'
    }
};

const renderCellContent = (rowIndex, cellIndex, countryNames, teamNames, nonPlayers, endGame, count, setCount, openModal) => {
    // Counter on 0,0
    if (rowIndex === 0 && cellIndex === 0) {
        return <Counter endGame={endGame} count={count} setCount={setCount} openModal={openModal} />;
    }
    // Countries on x-axis
    if (rowIndex === 0 && cellIndex > 0) {
        return <CountryFlag country={countryNames[cellIndex - 1]} cellIndex={cellIndex} />;
    }
    // Teams on y-axis
    if (cellIndex === 0 && rowIndex > 0) {
        return <TeamFlag teamNames={teamNames[rowIndex - 1]} rowIndex={rowIndex} />;
    }
    // Players
    if (cellIndex !== 0 && rowIndex !== 0) {
        const cellKey = `${countryNames[cellIndex - 1].name}-${teamNames[rowIndex - 1].name}`;
        return (
            <div className={cellKey}>
                {nonPlayers.includes(cellKey) && <CloseIcon fontSize="large" color="error" />}
            </div>
        );
    }
    return null;
};

export default function Cells({ props }) {
    const { rows, columns, countryNames, teamNames, nonPlayers, endGame, count, setCount, openModal } = props;

    return (
        <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: columns }, (_, cellIndex) => (
                        <td className={`${rowIndex}-${cellIndex}`} style={styles.td} key={`${rowIndex}-${cellIndex}`}>
                            {renderCellContent(rowIndex, cellIndex, countryNames, teamNames, nonPlayers, endGame, count, setCount, openModal)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
