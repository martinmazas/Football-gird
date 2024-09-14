import axios from 'axios'
const server = process.env.NODE_ENV === 'production' ? 'https://football-grid-edd30e867195.herokuapp.com' : 'http://localhost:8080'

const axiosConfig = {
    headers: {
        "Content-Type": "application/json",
    },
}

const handleError = (err, customMessage) => {
    console.error(customMessage, err);
    throw new Error(customMessage || 'An error occurred');
}


export const getPlayParams = async () => {
    console.log('getParams')
    try {
        const { data } = await axios.get(`${server}/parameters`, { ...axiosConfig });
        return data
    } catch (err) {
        handleError(err, 'Failed to fetch play parameters')
    }
}

export const getPlayer = async (playerName, setScore, setPlayerOptions, countryNames, teamNames, setIsError) => {
    try {
        countryNames = countryNames.map(country => country.name)
        teamNames = teamNames.map(team => team.name)

        const { data } = await axios.get(`${server}/players/guessPlayer`, {
            ...axiosConfig,
            params: {
                playerName,
                countryNames,
                teamNames
            }
        })

        if (typeof data === 'string' || data.length === 0) {
            setIsError(data);
        } else if (data.length === 1) {
            addPhoto(data, setIsError, setScore);
        } else {
            setPlayerOptions(data);
        }
    } catch (err) { handleError(err, err) }
}


export const addPhoto = (players, setIsError, setScore = null) => {
    if (players.length === 0) return alert(`No matches`)

    const player = players[0]
    if (!player) return

    try {
        const playerDiv = document.getElementsByClassName(`${player.country}-${player.team}`);
        if (playerDiv[0]) {
            const parentDiv = playerDiv[0].parentNode;

            // Create and add the player image
            const img = document.createElement('img');
            img.src = require(`../images/Players/24-25/${player.imgPath}.jpeg`);
            img.alt = `${player.secondName}`;
            img.id = 'player-img';

            // Insert the image and remove the old div
            parentDiv.prepend(img);
            parentDiv.removeChild(playerDiv[0]);

            // Update the score asynchronously
            if (setScore) {
                setScore(prevScore => prevScore + 1);
            }
        } else {
            setIsError(`The chosen position for ${player.country}-${player.team} is already in use`);
        }
    } catch (err) {
        handleError(err, 'Error while adding player photo');
    }
}