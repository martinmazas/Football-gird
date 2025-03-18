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

export const getPlayer = async (playerName) => {
    try {
        const { data } = await axios.get(`${server}/api/players/options`, {
            ...axiosConfig,
            params: {
                playerName
            }
        })
        return data
    } catch (err) {
        handleError(err, 'Failed to fetch player options')
    }
}

export const guessPlayer = async (playerName, setIsError, combinations, setCombinations) => {
    try {
        const { data } = await axios.get(`${server}/api/players/guess`, {
            ...axiosConfig,
            params: {
                playerName,
                combinations
            }
        })

        const playerCombination = `${data.country}-${data.team}`
        if (data === 'Player not found' || !combinations.includes(playerCombination)) {
            setIsError(`No place for ${playerName}`)
        } else {
            addPhoto(data, playerCombination);
            const removeCombinationIndex = combinations.indexOf(playerCombination)
            setCombinations(combinations.filter((_, index) => index !== removeCombinationIndex))
        }
    } catch (err) {
        handleError(err, 'Failed to guess player')
    }
}

export const addPhoto = (player, playerCombination) => {
    if (!player) return

    try {
        const playerDiv = document.getElementsByClassName(`grid-place-${playerCombination}`);

        if (playerDiv[0]) {
            const img = require(`../images/Players/24-25/${player.imgPath.trim()}.webp`)
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
        } else {
            console.log('Unexpected error')
        }
    } catch (err) {
        handleError(err, 'Error while adding player photo');
    }
}