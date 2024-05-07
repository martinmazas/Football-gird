import axios from 'axios'

export const getRandomNumbers = (requiredElements, elementsNum) => {
    const result = new Set()

    // Picks x random numbers in order to get random teams and countries
    while (result.size < requiredElements - 1) {
        const rand = Math.floor(Math.random() * (elementsNum.length))
        result.add(rand)
    }

    return Array.from(result)
}

export const getPlayer = (playerName, countries, teams, score, setScore, setPlayerOptions) => {
    axios.get('http://localhost:8080/players/guessPlayer', {
        headers: {
            "Content-type": "application/json",
        }, params: {
            playerName,
            countries,
            teams
        }
    })
        .then(data => {
            if (typeof(data.data) === 'string' || data.data.length === 0) alert(data.data)
            else if (data.data.length === 1) addPhoto(data.data, score, setScore)
            else setPlayerOptions(data.data)
        })
        .catch(err => console.log(err))
}


export const addPhoto = (players, score, setScore) => {
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
