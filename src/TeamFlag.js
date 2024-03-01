import { markCell } from "./Utils/functions"

const styles = {
    logos: {
        width: '15em',
        height: '15em',
        margin: 'auto'
    }
}

const TeamFlag = (props) => {
    const { team, rowIndex, table } = { ...props }

    markCell(table, 0, rowIndex)

    return (
        <img className={`flag-${team.name}`} src={require(`./images/${team.code}.jpeg`)} alt={`${team.code}`} style={styles.logos} />
    )
}

export default TeamFlag