import React from "react"
import './index.css'
import ResponsiveImage from "./ResponsiveImage"
const s3Path = 'https://db3l8v64ekfvu.cloudfront.net/images/Team-shield/'

const TeamFlag = (props) => {
    const { team } = { ...props }

    return (
        <a href={team.url} target="_blank" rel="noopener noreferrer">
            <ResponsiveImage id={`shield-${team.name}`} src={`${s3Path}${team.code}.webp`} alt={`${team.code}`} />
        </a>
    )
}

export default TeamFlag