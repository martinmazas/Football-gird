import Cells from "./cells";

const styles = {
    canvas: {
        display: 'grid',
        // alignItems: 'center',
        // justifyContent: 'center',
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
    return (
        <div>
            <table border="1" style={styles.table}>
                <tbody style={styles.tbody}>
                    <Cells />
                </tbody>
            </table>
        </div>
    )
}

export default GridTable;