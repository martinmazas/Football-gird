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
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { WinnerDialogProps } from '../Types/types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

export default function WinnerDialog({ handleRestartButton, count, setEndGame} : WinnerDialogProps ) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    const handleClose = () => {
        setEndGame(false);
        handleRestartButton();
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={true}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: isSmallScreen ? '90%' : 'auto', // Adjust width for mobile
                    margin: isSmallScreen ? '10px auto' : 'auto', // Center properly on small screens
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: { xs: 2, sm: 3 },
                    fontSize: { xs: 20, sm: 24 },
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#4caf50',
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
            <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: { xs: 50, sm: 60 }, color: '#4caf50', mb: 2 }} />
                    <Typography variant={isSmallScreen ? "body1" : "h6"} gutterBottom>
                        You have completed the Grid Football Game!
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        It took you <strong>{count} seconds</strong> to finish. Great job!
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        borderRadius: '8px',
                        width: isSmallScreen ? '80%' : 'auto', // Make button larger on mobile
                    }}
                >
                    Play Again
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
