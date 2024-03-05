import countries from './countries.json'
import teams from './teams.json'
import React from 'react';
import CountryFlag from "./CountryFlag";
import TeamFlag from './TeamFlag';

const styles = {
    td: {
        width: '10vw',
        height: '10vw',
        textAlign: 'center',
        backgroundColor: '#07396b'
    }
}


const Cells = (props) => {
    const { rows, columns, randomNumbersCountries, randomNumbersTeams, table } = { ...props }

    return (
        <>
            {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {[...Array(columns)].map((_, cellIndex) => (
                            <td style={styles.td} key={[rowIndex, cellIndex]} >
                                {
                                    (rowIndex === 0 && cellIndex > 0) ?
                                        <CountryFlag country={countries[randomNumbersCountries[cellIndex - 1]]} cellIndex={cellIndex} table={table} />
                                    : (cellIndex === 0 && rowIndex > 0) ?
                                        <TeamFlag team={teams[randomNumbersTeams[rowIndex - 1]]} rowIndex={rowIndex} table={table} />
                                    : (cellIndex !== 0 && rowIndex !== 0) ?
                                        <div className={`${countries[randomNumbersCountries[cellIndex - 1]].name}-${teams[randomNumbersTeams[rowIndex - 1]].name}`}>
                                            {/* <img style={{width:100, height:100}} src={require('./images/Valverde.jpg')} alt='test'/> */}
                                        </div>
                                    : null
                                }   
                            </td>
                    ))}
                </tr>
            ))}
        </>
    )
}

export default Cells