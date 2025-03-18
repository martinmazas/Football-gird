import { Button, Container } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayerSearch from "./Components/PlayerSearch";


export default function GameOptions(props) {
    const { handleRestartButton, setIsError, combinations, setCombinations } = { ...props }

    return (
        <Container maxWidth='sm' id="play-game">
            <PlayerSearch setIsError={setIsError} combinations={combinations} setCombinations={setCombinations} />
            <Button size="small" id="restart-button" onClick={handleRestartButton} variant="contained">
                <RestartAltIcon />
            </Button>
        </Container>
    )
}