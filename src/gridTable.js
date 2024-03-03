import Cells from "./cells";
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


const GridTable = (props) => {
    const { rows, columns, randomNumbersCountries, randomNumbersTeams, table } = { ...props }

    return (
        <>
            <table border="1" style={styles.table}>
                <tbody className="tbody" style={styles.tbody}>
                    <Cells rows={rows} columns={columns} randomNumbersCountries={randomNumbersCountries} randomNumbersTeams={randomNumbersTeams} table = {table} />
                </tbody>
            </table>
        </>
    )
}

export default GridTable;