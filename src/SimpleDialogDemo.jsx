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
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { getPlayer, addPhoto } from './Utils/functions';
import FullWidthTextField from './FullWidthTextField';

function SimpleDialog(props) {
    const { onClose, open, playerOptions } = props;

    const handleClose = () => {
        onClose(playerOptions);
    };

    const handleListItemClick = (player) => {
        onClose(player);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select one of the plyers</DialogTitle>
            <List sx={{ pt: 0 }}>
                {playerOptions.map((player) => (
                    <ListItem disableGutters key={`${player.first_name}-${player.secondName}`}>
                        <ListItemButton onClick={() => handleListItemClick(player)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
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
    const { scoreState } = { ...props }
    const [playerOptions, setPlayerOptions] = useState([])

    const handleSubmit = (value) => {
        const { first_name, secondName } = { ...value }
        const player = playerOptions.filter(p => p.first_name === first_name && p.secondName === secondName)
        setPlayerOptions(player)
    }

    useEffect(() => {
        if (playerOptions.length === 1) addPhoto(playerOptions, scoreState.score, scoreState.setScore)
    }, [playerOptions])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleGuess = () => {
        getPlayer(query, scoreState.score, scoreState.setScore, setPlayerOptions)
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

    return (
        <>
            <FullWidthTextField query={query} handleChangeQuery={handleChangeQuery} />
            <Button style={{ fontSize: '30px' }} variant="contained" onClick={handleGuess}>
                Guess
            </Button>
            {playerOptions.length > 1 ?
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    playerOptions={playerOptions}
                /> : null
            }
        </>
    );
}