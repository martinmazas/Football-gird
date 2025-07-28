import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TournamentCard from "./TournamentCard";
import { useState } from "react";
import InstructionsCard from "./InstructionsCard";
import BelowGameAd from "./BelowGameAd";
import { Tournament } from "../Types/types";
import tournamentsData from "../Utils/tournaments.json";

const tournaments: Tournament[] = tournamentsData;

export default function HomePage() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(true);

    const handleCardClick = (tournament: Tournament) => {
        navigate(`/app?tournament=${tournament.name}`);
    };

    return (
        <>
            {openModal ? (
                <InstructionsCard setOpenModal={setOpenModal} />
            ) : (
                <Box
                    sx={{
                        minHeight: "100vh",
                        backgroundColor: "#121212",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Container
                        maxWidth="md"
                        sx={{
                            backgroundColor: "#1e1e1e",
                            borderRadius: "12px",
                            p: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            border: "1px solid #2a2a2a",
                        }}
                    >
                        <BelowGameAd tournament={"HOME"} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: "2rem", md: "3rem" },
                                color: "#ffffff",
                                mb: 3,
                                textAlign: "center",
                            }}
                        >
                            Choose the Tournament
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: 2,
                                px: { xs: 1, sm: 3 },
                            }}
                        >
                            {tournaments.map((t) => (
                                <TournamentCard key={t.id} tournament={t} onCardClick={handleCardClick} />
                            ))}
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    );
}
