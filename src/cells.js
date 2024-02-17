import ReactCountryFlag from "react-country-flag"
import countries from './countries.json'
import teams from './teams.json'
import React from 'react';

const styles = {
    td: {
        width: '10vw',
        height: '10vw',
        textAlign: 'center',
        backgroundColor: '#07396b'
    },
    flag: {
        fontSize: '15em'
    },
    logos: {
        width: '15em',
        height: '15em',
        margin: 'auto'
    }

}


const Cells = (props) => {
    const { rows, columns, randomNumbersCountries, randomNumbersTeams } = { ...props }

    return (
        <>
            {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {[...Array(columns)].map((_, cellIndex) => (
                        <td className="td-cell" style={styles.td} key={[rowIndex, cellIndex]} >
                            {
                                (randomNumbersTeams.length && randomNumbersCountries.length) ?
                                    (rowIndex === 0 && cellIndex > 0 && cellIndex < columns) ?
                                        <ReactCountryFlag countryCode={`${countries[randomNumbersCountries[cellIndex - 1]].code}`}
                                            style={styles.flag} />
                                        :
                                        (cellIndex === 0 && rowIndex > 0 && rowIndex < rows) ?
                                            <img src={require(`./images/${teams[randomNumbersTeams[rowIndex - 1]].code}.jpeg`)} alt={`${teams[randomNumbersTeams[rowIndex - 1]].code}`} style={styles.logos} />
                                            : null
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