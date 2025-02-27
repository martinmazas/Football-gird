import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TournamentCard from "./TournamentCard";
import { useState } from "react";
import InstructionsCard from "./InstructionsCard";
const tournaments = require("../Utils/tournaments.json");

export default function HomePage() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(true)

    const handleCardClick = (tournament) => {
        navigate(`/app?tournament=${tournament.name}`);
    };

    return (
        <>
            {openModal ? <InstructionsCard setOpenModal={setOpenModal} /> :
                <Box sx={{ textAlign: "center", mt: { xs: "2rem", md: "4rem" }, px: "1rem" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "2rem", md: "3rem" },
                            color: "white",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            mb: { xs: "1.5rem", md: "2rem" },
                        }}
                    >
                        Choose the Football Grid Tournament
                    </Typography>

                    {/* Tournament Cards Section */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1.5rem",
                            mt: { xs: "2rem", md: "4rem" },
                            px: "2rem",
                            maxWidth: "1200px",
                            mx: "auto",
                        }}
                    >
                        {tournaments.map((tournament, index) => (
                            <TournamentCard key={index} tournament={tournament} onCardClick={handleCardClick} />
                        ))}
                    </Box>
                </Box>
            }
        </>
    );
}
