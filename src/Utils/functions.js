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
    console.log(countries)

    let playerCountry, playerTeam

    if (playerResult !== undefined) {
        // Check if the player and country are in the board
        playerCountry = countries.find(c => c.includes(playerResult.country))

        // Check if the player and team are in the board
        playerTeam = teams.find(t => t.includes(playerResult.team))
    }

    (playerCountry && playerTeam) ? addPhoto(playerResult) : alert('Nothing')

    // return [playerCountry, playerTeam]
}

export const markCell = (arr, cellRow, cellCol) => {
    arr[cellRow][cellCol] = 1
}

export const checkCell = (arr, cellRow, cellCol) => {

}

export const addPhoto = (player) => {
    const playerDiv = document.getElementsByClassName(`${player.country}-${player.team}`)
    if (playerDiv[0]) {
        const img = document.createElement('img')
        img.src = require(`../images/${player.imgPath}`)
        img.alt = `${player.second_name}`
        img.width = 100
        img.height = 100
        console.log(img)
        playerDiv[0].appendChild(img)
    }
}
