import Cells from "./cells";
import React from 'react';

const styles = {
    table: {
        margin: '10vh auto 0',
    }
}

const GridTable = (props) => {
    return (
        <table border="1" style={styles.table}>
            <tbody className="tbody">
                <Cells props={props} />
            </tbody>
        </table>
    )
}

export default GridTable;