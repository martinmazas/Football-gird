import axios from 'axios'

export const getTeams = async () => {
    const teams = []
    await axios.get('http://localhost:8080/teams', {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(data => {
            teams.push(data.data)
        })
        .catch(err => console.log(err))

    return teams
}

export const getCountries = async () => {
    const countries = []
    await axios.get('http://localhost:8080/countries', {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(data => {
            countries.push(data.data)
        })
        .catch(err => console.log(err))

    return countries
}

export const getPlayer = (playerName, score, setScore, setPlayerOptions) => {
    axios.get('http://localhost:8080/players/guessPlayer', {
        headers: {
            "Content-type": "application/json",
        }, params: {
            playerName
        }
    })
        .then(data => {
            if (typeof (data.data) === 'string' || data.data.length === 0) alert(data.data)
            else if (data.data.length === 1) addPhoto(data.data, score, setScore)
            else setPlayerOptions(data.data)
        })
        .catch(err => console.log(err))
}


export const addPhoto = (players, score = null, setScore = null) => {
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
            img.src = require(`../images/${player.imgPath}.jpeg`)
            img.alt = `${player.secondName}`
            img.style.width = '80%'
            img.style.height = '80%'
            img.style.margin = 'auto'

            // Add the player image and delete the previous div
            parentDiv.prepend(img)
            parentDiv.removeChild(playerDiv[0])
            setScore(score + 1)
        } else {
            alert(`The chosen position for Country:${player.country} and Team: ${player.team} is already in use`)
        }
    }
}

export const getFinalResult = (randomCountries, randomTeams, setFinalResult, setNonPlayers) => {
    randomTeams = randomTeams.map(team => team.name)
    randomCountries = randomCountries.map(country => country.name)

    axios.get('http://localhost:8080/players/finalResult', {
        headers: {
            "Content-type": "application/json",
        }, params: {
            randomCountries,
            randomTeams
        }
    })
        .then(data => {
            const { playersNumber, noPossiblePlayers } = { ...data.data }
            setFinalResult(playersNumber)

            const noPlayerPair = noPossiblePlayers.map(player => {
                return player.join('-')
            })

            setNonPlayers(noPlayerPair)
        })
        .catch(err => console.log(err))
}
