import players from '../data.json'

export const getRandomNumbers = (requiredElements, elementsNum) => {
    const result = new Set()

    while (result.size < requiredElements - 1) {
        const rand = Math.floor(Math.random() * (elementsNum.length))
        result.add(rand)
    }

    return Array.from(result)
}

export const getPlayer = (playerName, countries, teams) => {
    // Find the player by second name
    const playerResult = players.find(p => p.second_name.toLocaleLowerCase() === playerName.toLocaleLowerCase())

    let playerCountry, playerTeam

    if (playerResult !== undefined) {
        // Check if the player and country are in the board
        playerCountry = countries.find(c => c.includes(playerResult.country))

        // Check if the player and team are in the board
        playerTeam = teams.find(t => t.includes(playerResult.team))
    }

    (playerCountry && playerTeam) ? addPhoto(playerResult) : alert('Nothing')
}


export const addPhoto = (player) => {
    // Get the team and country div for the selected player
    const playerDiv = document.getElementsByClassName(`${player.country}-${player.team}`)

    if (playerDiv[0]) {
        // Get the parent of the player's div
        const parentDiv = playerDiv[0].parentNode

        // Create the player image
        const img = document.createElement('img')
        img.src = require(`../images/${player.imgPath}.jpeg`)
        img.alt = `${player.second_name}`
        img.style.width = '80%'
        img.style.height = '80%'
        img.style.margin = 'auto'

        // Add the player image and delete the previous div
        parentDiv.prepend(img)
        parentDiv.removeChild(playerDiv[0])
    }
}
