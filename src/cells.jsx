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
}


export default function Cells(props) {
    const { rows, columns, countryNames, teamNames, nonPlayers, endGame, count, setCount } = { ...props.props }

    return (
        <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: columns }, (_, cellIndex) => (
                        <td className={`${rowIndex}-${cellIndex}`} style={styles.td} key={[rowIndex, cellIndex]} >
                            {
                                (rowIndex === 0 && cellIndex === 0) ?
                                    <Counter endGame={endGame} count={count} setCount={setCount} /> :
                                    (rowIndex === 0 && cellIndex > 0) ?
                                        // The first row is reserved for the country flags
                                        <CountryFlag country={countryNames[cellIndex - 1]} cellIndex={cellIndex} />
                                        : (cellIndex === 0 && rowIndex > 0) ?
                                            // The first column is reserved for the team logo
                                            <TeamFlag teamNames={teamNames[rowIndex - 1]} rowIndex={rowIndex} />
                                            : (cellIndex !== 0 && rowIndex !== 0) &&
                                            // Where there is no player possible, add an icon to indicate that there is no option
                                            <div className={`${countryNames[cellIndex - 1].name}-${teamNames[rowIndex - 1].name}`}>
                                                {nonPlayers.includes(`${countryNames[cellIndex - 1].name}-${teamNames[rowIndex - 1].name}`) && <CloseIcon fontSize='large' color='error' />}
                                            </div>
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}