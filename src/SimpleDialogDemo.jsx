import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { getPlayer, addPhoto } from './Utils/functions';
import FullWidthTextField from './FullWidthTextField';
import './index.css'
// import ReactCountryFlag from "react-country-flag"

function SimpleDialog(props) {
    const { onClose, open, playerOptions, countryNames } = props;
    console.log(countryNames)

    // const getCountryCode = (country) => {
    //     const code = countryNames.filter(c => c.name === country)[0].code
    //     return code
    // }
    

    const handleClose = () => {
        onClose(playerOptions);
    };

    const handleListItemClick = (player) => {
        onClose(player);
    };

    return (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
            <DialogTitle>Select one of the plyers</DialogTitle>
            <List sx={{ pt: 0 }}>
                {playerOptions.map((player) => (
                    <ListItem disableGutters key={`${player.first_name}-${player.secondName}`}>
                        <ListItemButton onClick={() => handleListItemClick(player)}>
                            <ListItemAvatar>
                                <Avatar alt={`${player.first_name}-${player.secondName}`} src={require(`./images/${player.imgPath}.jpeg`)} />
                                {/* <Avatar><ReactCountryFlag svg countryCode={`${getCountryCode(player.country)}`} className={`flag-${player.country.name}`} /></Avatar> */}
                            </ListItemAvatar>
                            <ListItemText primary={`${player.first_name} ${player.secondName}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { setScore, countryNames, teamNames } = { ...props }
    const [playerOptions, setPlayerOptions] = useState([])

    const handleSubmit = (value) => {
        const { first_name, secondName } = { ...value }
        const player = playerOptions.filter(p => p.first_name === first_name && p.secondName === secondName)
        setPlayerOptions(player)
    }

    useEffect(() => {
        if (playerOptions.length === 1) addPhoto(playerOptions, setScore)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerOptions])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleGuess = () => {
        getPlayer(query, setScore, setPlayerOptions, countryNames, teamNames)
        setQuery('')
        handleClickOpen()
    };

    const handleChangeQuery = (event) => {
        setQuery(event.target.value);
    };

    const handleClose = (value) => {
        setOpen(false);
        handleSubmit(value)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    };

    return (
        <>
            <FullWidthTextField query={query} handleChangeQuery={handleChangeQuery} handleKeyDown={handleKeyDown} />
            <Button id='guess-button' size='small' variant="contained" onClick={handleGuess}>Guess</Button>
            {playerOptions.length > 1 &&
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    playerOptions={playerOptions}
                    countryNames={countryNames}
                />
            }
        </>
    );
}