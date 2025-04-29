import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TournamentCard from "./TournamentCard";
import { useState } from "react";
import InstructionsCard from "./InstructionsCard";
const tournaments = require("../Utils/tournaments.json");

export default function HomePage() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(true);

    const handleCardClick = (tournament) => {
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
                        backgroundColor: "#121212", // your dark background
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Container
                        maxWidth="md"
                        sx={{
                            backgroundColor: "#1e1e1e", // matches darker tone
                            borderRadius: "12px",
                            p: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            border: "1px solid #2a2a2a",
                        }}
                    >
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
                                gap: "1.5rem",
                                mt: 4,
                            }}
                        >
                            {tournaments.map((tournament, index) => (
                                <TournamentCard key={index} tournament={tournament} onCardClick={handleCardClick} />
                            ))}
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    );
}
