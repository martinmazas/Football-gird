import Cells from "./cells";
import React from 'react';

const styles = {
    table: {
        margin: '3rem auto 0',
        width: '8rem',
    }
}

const GridTable = (props) => {
    return (
        <table style={styles.table}>
            <tbody className="tbody">
                <Cells props={props} />
            </tbody>
        </table>
    )
}

export default GridTable;