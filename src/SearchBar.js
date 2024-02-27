import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPlayer } from './Utils/functions';
import countries from './countries.json'
import teams from './teams.json'

const styles = {
    searchBar: {
        margin: '0 auto',
        width: 250,
        height: 40,
    },
    button: {
        margin: '2vh 1vw',
        fontSize: '30px',
    },
}

function SearchBar(props) {
    const { randomNumbersCountries, randomNumbersTeams } = { ...props }
    const [query, setQuery] = useState('');
    const [teamNames, setTeamNames] = useState([])
    const [countryNames, setCountryNames] = useState([])

    useEffect(() => {
        randomNumbersCountries.map(country => setCountryNames(countryNames => [...countryNames, countries[country]]))
        randomNumbersTeams.map(team => setTeamNames(teamNames => [...teamNames, teams[team]]))
    }, [randomNumbersCountries, randomNumbersTeams])

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleGuess = () => {
        getPlayer(query, countryNames, teamNames)
    };

    return (
        <>
            <input
                className="guess-input"
                type="text"
                placeholder="Enter player's name"
                value={query}
                onChange={handleChange}
                style={styles.searchBar}
            />
            <Button className="guess-button" style={styles.button} onClick={handleGuess} variant="contained">Guess</Button>
        </>
    );
}

export default SearchBar;
