import React from "react"
import './index.css'

const TeamFlag = (props) => {
    const { team } = { ...props }

    return (
        <a href={team.url} target="_blank" rel="noopener noreferrer">
            <img id={`shield-${team.name}`} src={require(`./images/Team-shields/${team.code}.jpeg`)} alt={`${team.code}`} />
        </a>
    )
}

export default TeamFlag