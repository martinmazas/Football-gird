import { Button, Container } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayerSearch from "./Components/PlayerSearch";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export default function GameOptions(props) {
    const { handleRestartButton, setIsError, combinations, setCombinations } = { ...props }
    const navigate = useNavigate();

    return (
        <Container maxWidth='sm' id="play-game">
            <PlayerSearch setIsError={setIsError} combinations={combinations} setCombinations={setCombinations} />
            <Button size="small" id="restart-button" onClick={handleRestartButton} variant="contained">
                <RestartAltIcon />
            </Button>
            <Button size="small" id="home-button" onClick={() => navigate(-1)} sx={{ color: "white" }}>
                <HomeIcon sx={{ fontSize: "2rem" }} />
            </Button>
        </Container>
    )
}