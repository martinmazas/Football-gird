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
import { useEffect, useState, useMemo } from 'react';
import { getPlayer, addPhoto } from './Utils/functions';
import FullWidthTextField from './FullWidthTextField';
import './index.css'
import ReactCountryFlag from "react-country-flag"
import { Box } from '@mui/material';

const SimpleDialog = (props) => {
    const { onClose, open, playerOptions, countries, teams } = props
    const countryCodeMap = useMemo(() => {
        return countries.reduce((map, country) => {
            map[country.name] = country.code;
            return map;
        }, {});
    }, [countries]);

    const teamCodeMap = useMemo(() => {
        return teams.reduce((map, team) => {
            map[team.name] = team.code;
            return map;
        }, {});
    }, [teams]);

    const getCountryCode = (country) => countryCodeMap[country];
    const getTeamCode = (team) => teamCodeMap[team];
    const handleClose = () => onClose(playerOptions)
    const handleListItemClick = (player) => onClose(player);

    return (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
            <DialogTitle>Select one of the players</DialogTitle>
            <List sx={{ pt: 0 }}>
                {playerOptions.map((player) => (
                    <ListItem disableGutters key={`${player.first_name}-${player.second_name}-${player.team}-${player.country}`}>
                        <ListItemButton onClick={() => handleListItemClick(player)}>
                            <ListItemAvatar>
                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} alignItems="center">
                                    <Avatar alt={`${player.first_name}-${player.second_name}`} src={require(`./images/Players/24-25/${player.imgPath}.webp`)} />
                                    <ListItemText primary={`${player.first_name} ${player.second_name}`} />
                                    <Avatar id='country-avatar'>
                                        <ReactCountryFlag svg countryCode={getCountryCode(player.country)} />
                                    </Avatar>
                                    <Avatar id='team-avatar' src={`https://db3l8v64ekfvu.cloudfront.net/images/Team-shield/${getTeamCode(player.team)}.webp`} />
                                </Box>
                            </ListItemAvatar>
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
    const { handleScore, countries, teams, isError, setIsError } = { ...props }
    const [playerOptions, setPlayerOptions] = useState([])

    const handleSubmit = (value) => {
        const { first_name, second_name, imgPath } = { ...value }
        const player = playerOptions.filter(p => p.first_name === first_name && p.second_name === second_name && p.imgPath === imgPath)
        setPlayerOptions(player)
    }

    useEffect(() => {
        if (playerOptions.length === 1) addPhoto(playerOptions, setIsError, handleScore)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerOptions])

    const handleClickOpen = () => setOpen(true);

    const handleGuess = () => {
        getPlayer(query, handleScore, setPlayerOptions, setIsError)
        setQuery('')
        handleClickOpen()
    };

    const handleChangeQuery = (event) => {
        setIsError(false)
        setQuery(event.target.value);
    };

    const handleClose = (value) => {
        setOpen(false);
        handleSubmit(value)
    };

    const handleKeyDown = (event) => event.key === 'Enter' && handleGuess()

    return (
        <>
            <FullWidthTextField query={query} handleChangeQuery={handleChangeQuery} handleKeyDown={handleKeyDown} isError={isError} />
            <Button id='guess-button' size='small' variant="contained" onClick={handleGuess}>Guess</Button>
            {playerOptions.length > 1 &&
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    playerOptions={playerOptions}
                    countries={countries}
                    teams={teams}
                />
            }
        </>
    );
}