import { getPlayer, guessPlayer } from "../Utils/functions";
import { useCallback, useState } from "react";
import { Box, Input } from "@mui/material";
import debounce from 'lodash/debounce';
import '../Styles/index.css'

export default function PlayerSearch(props) {
    const { setIsError, combinations, setCombinations } = props;
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const fetchPlayers = async (query) => {
        if (!query) return;

        try {
            const data = await getPlayer(query);
            const strData = data.map(player => `${player.first_name} ${player.second_name}`);
            setOptions(strData || []);
            setHighlightedIndex(-1);
            setIsDropdownVisible(true);
        } catch (err) {
            console.log(err);
        }
    };

    // eslint-disable-next-line
    const debouncedFetchPlayers = useCallback(debounce(fetchPlayers, 300), []);

    const handleInputChange = (event) => {
        const newVal = event.target.value;
        setInputValue(newVal);

        if (newVal.length >= 3) {
            debouncedFetchPlayers(newVal);
        } else {
            setOptions([]);
            setIsDropdownVisible(false);
        }
        setIsError(false);
    };

    const handleSelect = (player) => {
        setOptions([]);
        setIsDropdownVisible(false);
        guessPlayer(player, setIsError, combinations, setCombinations);
        setInputValue('');

        // Close mobile keyboard
        document.activeElement.blur();

        // Fix Chrome mobile bug
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowDown":
                setHighlightedIndex((prevIndex) =>
                    prevIndex < options.length - 1 ? prevIndex + 1 : 0
                );
                break;
            case "ArrowUp":
                setHighlightedIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : options.length - 1
                );
                break;
            case "Enter":
                if (highlightedIndex !== -1) {
                    handleSelect(options[highlightedIndex]);
                }
                break;
            case "Escape":
                setOptions([]);
                setInputValue('');
                setIsDropdownVisible(false);
                break;
            default:
                break;
        }
    };

    const styles = {
        box: {
            bgcolor: '#031825',
            width: '13rem',
            // maxWidth: '60rem',
            outline: 'none',
            padding: '0.2rem 0.4rem',
            borderRadius: '0.4rem',
            border: '0.2rem solid #f2b705',
            position: "relative",
            '@media (minWidth: 600px)': {
                padding: '0.4rem 0.8rem',
                borderRadius: '0.6rem',
            },
            '@media (minWidth: 960px)': {
                padding: '0.6rem 1.2rem',
                borderRadius: '0.8rem',
            },
        },
        field: {
            color: '#fff',
            width: '100%',
            fontSize: '1rem',
            padding: '0.3rem 0',
            '::placeholder': {
                color: 'rgba(255, 255, 255, 0.6)',
            },
            '@media (minWidth: 600px)': {
                fontSize: '1.2rem',
            },
            '@media (minWidth: 960px)': {
                fontSize: '1.4rem',
            },
        },
        dropdown: {
            listStyle: "none",
            padding: "0",
            margin: "5px 0 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "white",
            position: "absolute",
            top: "100%", // Ensure dropdown appears below input
            left: 0,
            width: "100%",
            zIndex: 1000, // Ensure it's above other elements
            maxHeight: "200px",
            overflowY: "auto",
            display: isDropdownVisible ? "block" : "none",
        },
        listItem: (isHighlighted) => ({
            padding: "8px",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
            background: isHighlighted ? "#f2b705" : "white",
            color: isHighlighted ? "white" : "black",
        }),
    };

    return (
        <Box sx={styles.box}>
            <Input
                autoComplete="off"
                disableUnderline
                style={styles.field}
                placeholder="Type player here"
                id="playerName"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            {options.length > 0 && (
                <ul style={styles.dropdown}>
                    {options.map((player, index) => (
                        <li
                            key={index}
                            style={styles.listItem(index === highlightedIndex)}
                            onClick={() => handleSelect(player)}
                            onTouchStart={() => handleSelect(player)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {player}
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
}
