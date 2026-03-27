import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PlayerSearch from "./PlayerSearch";
import StatsDialog from "./StatsDialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGameContext } from "../Context/GameContext";
import { getSurrenderSuggestions } from "../Utils/functions";

type GameOptionsProps = {
    handleRestartButton: () => void;
};

const buttonSx = { color: "white", minWidth: "42px", borderRadius: "10px" };

export default function GameOptions({ handleRestartButton }: GameOptionsProps) {
    const navigate = useNavigate();
    const { guessedPlayers, combinations, setCombinations, setGuessedPlayers, setSurrendered, setScoreAtSurrender, surrendered, endGame, tournament, saveResult } = useGameContext();
    const [surrenderOpen, setSurrenderOpen] = useState(false);
    const [statsOpen, setStatsOpen] = useState(false);
    const [surrendering, setSurrendering] = useState(false);

    const handleSurrender = async () => {
        if (surrendered || endGame) return;

        saveResult(tournament ?? "Unknown", Object.keys(guessedPlayers).length);
        setSurrenderOpen(false);

        if (!Array.isArray(combinations) || combinations.length === 0) return;

        setScoreAtSurrender(Object.keys(guessedPlayers).length);
        setSurrendered(true);
        setSurrendering(true);
        try {
            const suggestions = await getSurrenderSuggestions(combinations, tournament);
            suggestions.forEach((player) => {
                const key = `${player.country}-${player.team}`;
                setGuessedPlayers((prev) => ({ ...prev, [key]: { ...player, isSuggestion: true } }));
            });
            // Set to false so the win-condition effect in App is not triggered
            setCombinations(false);
        } catch {
            handleRestartButton();
        } finally {
            setSurrendering(false);
        }
    };

    return (
        <>
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
                <PlayerSearch />
                <Button
                    size="small"
                    id="restart-button"
                    onClick={handleRestartButton}
                    sx={buttonSx}
                >
                    <RestartAltIcon />
                </Button>
                <Button
                    size="small"
                    id="surrender-button"
                    onClick={() => setSurrenderOpen(true)}
                    disabled={surrendered || endGame}
                    sx={buttonSx}
                >
                    <FlagIcon />
                </Button>
                <Button
                    size="small"
                    id="stats-button"
                    onClick={() => setStatsOpen(true)}
                    sx={buttonSx}
                >
                    <LeaderboardIcon />
                </Button>
                <Button
                    size="small"
                    id="home-button"
                    onClick={() => navigate(-1)}
                    sx={buttonSx}
                >
                    <HomeIcon />
                </Button>
            </Container>

            {/* Surrender confirmation */}
            <Dialog
                open={surrenderOpen}
                onClose={() => setSurrenderOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: "14px",
                        px: 1,
                        py: 0.5,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 700 }}>Surrender?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to surrender? Your current progress will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ gap: 1, pb: 2, px: 2 }}>
                    <Button
                        onClick={() => setSurrenderOpen(false)}
                        variant="outlined"
                        sx={{ borderRadius: "8px", textTransform: "none" }}
                    >
                        Keep playing
                    </Button>
                    <Button
                        onClick={handleSurrender}
                        variant="contained"
                        color="error"
                        disabled={surrendering}
                        sx={{ borderRadius: "8px", textTransform: "none" }}
                    >
                        {surrendering ? "Loading..." : "Yes, surrender"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Stats dialog */}
            <StatsDialog
                open={statsOpen}
                onClose={() => setStatsOpen(false)}
                currentTournament={tournament}
            />
        </>
    );
}
