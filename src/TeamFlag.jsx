import React from "react"
import './index.css'

const TeamFlag = (props) => {
    const { teamNames } = { ...props }

    return (
        <a href={teamNames.web} target="_blank" rel="noopener noreferrer">
            <img id={`shield-${teamNames.name}`} src={require(`./images/Teams/${teamNames.code}.jpeg`)} alt={`${teamNames.code}`} />
        </a>
    )
}

export default TeamFlag