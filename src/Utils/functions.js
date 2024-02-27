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
    const playerResult = players.find(p => p.second_name === playerName)
    let playerResultWithCondition
    if (playerResult !== undefined) {
        playerResultWithCondition = countries.find(c => c.name.includes(playerResult.country)) && teams.find(t => t.name.includes(playerResult.team))
    }
    else console.log('NO');

    console.log(playerResultWithCondition)
}