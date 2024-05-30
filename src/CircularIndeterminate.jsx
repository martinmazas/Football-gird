import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box>
            <CircularProgress size={'10rem'} style={{ position: 'absolute', left: '50%', top: '50%' }} />
        </Box>
    );
}