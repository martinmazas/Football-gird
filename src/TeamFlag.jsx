import React from "react"
import './index.css'
import ResponsiveImage from "./ResponsiveImage"
const s3Path = 'https://football-grid-s3.s3.us-east-2.amazonaws.com/images/Team-shields/'

const TeamFlag = (props) => {
    const { team } = { ...props }

    return (
        <a href={team.url} target="_blank" rel="noopener noreferrer">
            <ResponsiveImage id={`shield-${team.name}`} src={`${s3Path}${team.code}.jpeg`} alt={`${team.code}`} />
        </a>
    )
}

export default TeamFlag