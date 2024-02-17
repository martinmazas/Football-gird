import React, { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleGuess = () => {
        console.log(query)
    };

    return (
        <>
            <input
                className="guess-input"
                type="text"
                placeholder="Enter player's name"
                value={query}
                onChange={handleChange}
            />
            <button className='guess-button' onClick={handleGuess}>Guess</button>
        </>
    );
}

export default SearchBar;
