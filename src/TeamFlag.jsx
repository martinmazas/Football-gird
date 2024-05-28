import React from "react"

const styles = {
    logos: {
        width: '10em',
        height: '10em',
        margin: 'auto'
    }
}

const TeamFlag = (props) => {
    const { teamNames } = { ...props }

    return (
        <img className={`flag-${teamNames.name}`} src={require(`./images/${teamNames.code}.jpeg`)} alt={`${teamNames.code}`} style={styles.logos} />
    )
}

export default TeamFlag