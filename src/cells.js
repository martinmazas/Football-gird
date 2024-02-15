import ReactCountryFlag from "react-country-flag"
import countries from './countries.json'
import teams from './teams.json'
import { useEffect, useState } from "react";

const styles = {
    td: {
        width: '10vw',
        height: '10vw',
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

const getRandomNumbers = (requiredElements, elementsNum) => {
    const result = new Set()

    while (result.size < requiredElements - 1) {
        const rand = Math.floor(Math.random() * (elementsNum.length))
        result.add(rand)
    }

    return Array.from(result)
}


const Cells = () => {

    const rows = 4;
    const columns = 4;

    const [randomNumbersCountries, setRandomNumbersCountries] = useState([])
    const [randomNumbersTeams, setRandomNumbersTeams] = useState([])

    useEffect(() => {
        const randomCountries = getRandomNumbers(rows, countries)
        setRandomNumbersCountries(randomCountries)

        const randomTeams = getRandomNumbers(columns, teams)
        setRandomNumbersTeams(randomTeams)
    }, [])


    return (
        <>
            {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {[...Array(columns)].map((_, cellIndex) => (
                        <td style={styles.td} key={[rowIndex, cellIndex]} >
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