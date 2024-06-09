import React from "react"

const styles = {
    logos: {
        width: '6rem',
        height: '6rem',
    }
}

const TeamFlag = (props) => {
    const { teamNames } = { ...props }

    return (
        <img className={`flag-${teamNames.name}`} src={require(`./images/Teams/${teamNames.code}.jpeg`)} alt={`${teamNames.code}`} style={styles.logos} />
    )
}

export default TeamFlag