import { Button, Container } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayerSearch from "./Components/PlayerSearch";


export default function GameOptions(props) {
    const { handleRestartButton, handleScore, setIsError } = { ...props }

    return (
        <Container maxWidth='sm' id="play-game">
            <PlayerSearch handleScore={handleScore} setIsError={setIsError} />
            <Button size="small" id="restart-button" onClick={handleRestartButton} variant="contained">
                <RestartAltIcon />
            </Button>
        </Container>
    )
}