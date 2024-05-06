import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addPhoto, getPlayer } from './Utils/functions';
import countries from './countries.json'
import teams from './teams.json'
import RowRadioButtonsGroup from './RowRadioButtonsGroup';

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
    const { randomNumbersCountries, randomNumbersTeams, scoreState } = { ...props }
    const [query, setQuery] = useState('');
    const [countryNames, setCountryNames] = useState([])
    const [teamNames, setTeamNames] = useState([])
    const [playerOptions, setPlayerOptions] = useState([])
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = () => {
        const name = value.split(" ")
        const player = playerOptions.filter(p => p.first_name === name[0] && p.secondName === name[1])
        setPlayerOptions(player)
    }

    useEffect(() => {
        randomNumbersCountries.map(country => setCountryNames(countryNames => [...countryNames, countries[country].name]))
        randomNumbersTeams.map(team => setTeamNames(teamNames => [...teamNames, teams[team].name]))
    }, [randomNumbersCountries, randomNumbersTeams])

    const handleChangeQuery = (event) => {
        setQuery(event.target.value);
    };

    const handleGuess = () => {
        getPlayer(query, countryNames, teamNames, scoreState.score, scoreState.setScore, setPlayerOptions)
        setQuery('')
    };

    useEffect(() => {
        if (playerOptions.length === 1) addPhoto(playerOptions, scoreState.score, scoreState.setScore)
    }, [playerOptions])

    return (
        <>
            {playerOptions.length > 1 ? <div style={{
                backgroundColor: "white",
                width: '500px',
                height: '100px',
                margin: 'auto auto',
                position: 'absolute',
            }}>
                <RowRadioButtonsGroup playerOptions={playerOptions} handleChange={handleChange} handleSubmit={handleSubmit} value={value} />
            </div> : null}
            <input
                className="guess-input"
                type="text"
                placeholder="Enter player's name"
                value={query}
                onChange={handleChangeQuery}
                style={styles.searchBar}
            />
            <Button className="guess-button" style={styles.button} onClick={handleGuess} variant="contained">Guess</Button>
        </>
    );
}

export default SearchBar;
