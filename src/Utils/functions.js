import axios from 'axios'
const server = process.env.NODE_ENV === 'production' ? 'https://football-grid-edd30e867195.herokuapp.com' : 'http://localhost:8080'

export const getPlayParams = async () => {
    const teams = []
    const countries = []
    let gridRows = 0
    let gridColumns = 0
    let playerNumber = 0
    const noPossiblePlayerList = []

    await axios.get(`${server}/parameters`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(data => {
            const { rows, columns, randomTeams, randomCountries, playerNumbers, noPossiblePlayers } = { ...data.data }
            gridRows = rows
            gridColumns = columns
            playerNumber = playerNumbers

            noPossiblePlayerList.push(noPossiblePlayers)
            teams.push(randomTeams)
            countries.push(randomCountries)
        })
        .catch(err => console.log(err))

    return { gridRows, gridColumns, teams, countries, playerNumber, noPossiblePlayerList }
}

export const getPlayer = (playerName, setScore, setPlayerOptions, countryNames, teamNames, setIsError) => {
    // console.log(teamNames)
    axios.get(`${server}/players/guessPlayer`, {
        headers: {
            "Content-type": "application/json",
        }, params: {
            playerName,
            countryNames: countryNames.map(country => country.name),
            teamNames: teamNames.map(team => team.name)
        }
    })
        .then(data => {
            if (typeof (data.data) === 'string' || data.data.length === 0) setIsError(data.data)
            else if (data.data.length === 1) addPhoto(data.data, setIsError, setScore)
            else setPlayerOptions(data.data)
        })
        .catch(err => console.log(err))
}


export const addPhoto = (players, setIsError, setScore = null) => {
    if (players.length === 0) return alert(`No matches`)

    const player = players[0]

    if (player) {
        // Get the team and country div for the selected player
        const playerDiv = document.getElementsByClassName(`${player.country}-${player.team}`)

        if (playerDiv[0]) {
            // Get the parent of the player's div
            const parentDiv = playerDiv[0].parentNode

            // Create the player image
            const img = document.createElement('img')
            img.src = require(`../images/Players/24-25/${player.imgPath}.jpeg`)
            img.alt = `${player.secondName}`
            img.id = 'player-img'

            // Add the player image and delete the previous div
            parentDiv.prepend(img)
            parentDiv.removeChild(playerDiv[0])

            // Update the score
            if (setScore) {
                setTimeout(() => {
                    setScore((prevScore) => prevScore + 1);
                }, 200);
            }
        } else {
            setIsError(`The chosen position for ${player.country}-${player.team} is already in use`)
        }
    }
}