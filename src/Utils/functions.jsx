import axios from 'axios'
import ResponsiveImage from '../ResponsiveImage';
import { createRoot } from 'react-dom/client';
import { cleanTournamentName } from './formatters';
const server = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_SERVER : 'http://localhost:8080';

const axiosConfig = {
    headers: {
        "Content-Type": "application/json"
    },
}

const setTournamentHeader = (tournament) => {
    tournament = cleanTournamentName(tournament)
    axiosConfig.headers["tournament"] = tournament
}

const handleError = (err, customMessage) => {
    console.error(customMessage, err);
    throw new Error(customMessage || 'An error occurred');
}

export const getPlayParams = async (tournament) => {
    // Request from the back the teams and countries for the specific tournament
    setTournamentHeader(tournament)
    try {
        const { data } = await axios.get(`${server}/api/parameters`, { ...axiosConfig });
        return data
    } catch (err) {
        handleError(err, 'Failed to fetch play parameters')
    }
}

export const getPlayer = async (playerName, tournament) => {
    try {
        setTournamentHeader(tournament)
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

export const guessPlayer = async (playerName, setIsError, combinations, setCombinations, tournament) => {
    try {
        setTournamentHeader(tournament)
        const { data } = await axios.get(`${server}/api/players/guess`, {
            ...axiosConfig,
            params: {
                playerName,
                combinations
            }
        })

        if (data === 'Player not found') {
            setIsError(`No place for ${playerName}`)
        } else {
            Array.from(data).forEach(player => {
                const playerCombination = `${player.country}-${player.team}`
                addPhoto(player, playerCombination);

                setCombinations(prevCombinations => {
                    // Remove the current combination from the previous state
                    const removeCombinationIndex = prevCombinations.indexOf(playerCombination);
                    return prevCombinations.filter((_, index) => index !== removeCombinationIndex);
                });
            })
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