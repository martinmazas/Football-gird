import { Button, Container } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayerSearch from "./Components/PlayerSearch";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { GameOptionsProps } from "./Types/types";

export default function GameOptions({ handleRestartButton, setIsError, combinations, setCombinations, tournament, setGuessedPlayers }: GameOptionsProps) {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth='sm'
            id="play-game"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.6, sm: 0.8 },
                flexWrap: "wrap",
                px: { xs: 1.1, sm: 1.5 },
                py: { xs: 1, sm: 1.25 },
            }}
        >
            <PlayerSearch setIsError={setIsError} combinations={combinations} setCombinations={setCombinations} tournament={tournament} setGuessedPlayers={setGuessedPlayers} />
            <Button
                size="small"
                id="restart-button"
                onClick={handleRestartButton}
                variant="contained"
                sx={{ minWidth: "42px", borderRadius: "10px" }}
            >
                <RestartAltIcon />
            </Button>
            <Button
                size="small"
                id="home-button"
                onClick={() => navigate(-1)}
                sx={{ color: "white", minWidth: "42px", borderRadius: "10px" }}
            >
                <HomeIcon sx={{ fontSize: "2rem" }} />
            </Button>
        </Container>
    )
}
