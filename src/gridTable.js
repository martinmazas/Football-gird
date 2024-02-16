import { useEffect, useState } from "react";
import { getRandomNumbers } from "./Utils/functions";
import Cells from "./cells";
import countries from './countries.json'
import teams from './teams.json'

const styles = {
    canvas: {
        display: 'grid',
        margin: '10vw auto',
        width: '40vw',
        height: '40vw',
        border: '2px solid',
    },
    tbody: {
        width: '40vw',
        height: '40vw',
        margin: '10vw auto',
    },
    table: {
        margin: '10vw auto',
    }
}


const GridTable = () => {
    const rows = 4;
    const columns = 4;

    const [randomNumbersCountries, setRandomNumbersCountries] = useState([])
    const [randomNumbersTeams, setRandomNumbersTeams] = useState([])

    useEffect(() => {
        const randomCountries = getRandomNumbers(rows, countries)
        const randomTeams = getRandomNumbers(columns, teams)

        setRandomNumbersCountries(randomCountries)
        setRandomNumbersTeams(randomTeams)
    }, [])

    const handleClick = () => {
        window.location.reload()
    }

    return (
        <div>
            <table border="1" style={styles.table}>
                <tbody style={styles.tbody}>
                    <Cells rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} />
                </tbody>
            </table>

            <button onClick={handleClick}>Restart</button>
        </div>
    )
}

export default GridTable;