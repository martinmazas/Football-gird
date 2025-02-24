import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

export default function WinnerDialog(props) {
    const { endGame, handleSetEndGame, handleClick, count } = { ...props }

    const handleClose = () => {
        handleSetEndGame();
        handleClick();
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={endGame}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 3,
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#4caf50', // Green for success
                    }}
                    id="customized-dialog-title"
                >
                    Congratulations!
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            You have completed the Grid Football Game!
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            It took you <strong>{count} seconds</strong> to finish. Great job!
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            borderRadius: '8px',
                        }}
                    >
                        Play Again
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
