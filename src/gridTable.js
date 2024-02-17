import { useEffect, useState } from "react";
import { getRandomNumbers } from "./Utils/functions";
import Cells from "./cells";
import countries from './countries.json'
import teams from './teams.json'
import React from 'react';


const styles = {
    tbody: {
        width: '40vw',
        height: '40vw',
    },
    table: {
        margin: '10vh auto 0'
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


    return (
        <>
            <table border="1" style={styles.table}>
                <tbody className="tbody" style={styles.tbody}>
                    <Cells rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} />
                </tbody>
            </table>
        </>
    )
}

export default GridTable;