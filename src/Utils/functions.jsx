import axios from 'axios'
import ResponsiveImage from '../ResponsiveImage';
import { createRoot } from 'react-dom/client';
const server = process.env.NODE_ENV === 'production' ? 'https://football-grid-edd30e867195.herokuapp.com' : 'http://localhost:8080';
const axiosConfig = {
    headers: {
        "Content-Type": "application/json"
    },
}

const handleError = (err, customMessage) => {
    console.error(customMessage, err);
    throw new Error(customMessage || 'An error occurred');
}

export const getPlayParams = async (tournament) => {
    // Request from the back the teams and countries for the specific tournament
    tournament = tournament.toUpperCase().replace(/\s\d+(\/*\d+)?/, '').trim() // Get only the tournament name
    axiosConfig.headers["tournament"] = tournament
    try {
        const { data } = await axios.get(`${server}/api/parameters`, { ...axiosConfig });
        return data
    } catch (err) {
        handleError(err, 'Failed to fetch play parameters')
    }
}

export const getPlayer = async (playerName, handleScore, setPlayerOptions, countryNames, teamNames, setIsError) => {
    try {
        countryNames = countryNames.map(country => country.name)
        teamNames = teamNames.map(team => team.name)

        // Prepare all the possible combination of team-country
        let combinations = []
        const possibleCombinations = document.querySelectorAll('[class^=grid-place]')
        possibleCombinations.forEach(combination => combinations.push(combination.className))

        const { data } = await axios.get(`${server}/api/players/guessPlayer`, {
            ...axiosConfig,
            params: {
                playerName,
                combinations
            }
        })

        if (typeof data === 'string' || !data.length) {
            setIsError(data);
        } else if (data.length === 1) {
            addPhoto(data, setIsError, handleScore);
        } else {
            setPlayerOptions(data);
        }
    } catch (err) { handleError(err, err) }
}

export const addPhoto = (players, setIsError, handleScore) => {
    const player = players[0]
    if (!player) return

    try {
        const playerDiv = document.getElementsByClassName(`grid-place-${player.country}-${player.team}`);
        if (playerDiv[0]) {
            const img = require(`../images/Players/24-25/${player.imgPath}.webp`)
            const parentDiv = playerDiv[0].parentNode;

            createRoot(
                parentDiv
            ).render(
                <ResponsiveImage
                    src={img}
                    alt={player.second_name}
                    roundedBorder={true}
                />
            )

            parentDiv.removeChild(playerDiv[0]);

            // Update the score asynchronously
            handleScore()
        } else {
            setIsError(`The chosen position for ${player.country}-${player.team} is already in use`);
        }
    } catch (err) {
        handleError(err, 'Error while adding player photo');
    }
}