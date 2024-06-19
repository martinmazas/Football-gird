import Cells from "./cells";
import React from 'react';

const styles = {
    table: {
        margin: '3rem auto 0',
    }
}

export default function GridTable(props) {
    return (
        <table style={styles.table}>
            <Cells props={props} />
        </table>
    )
}