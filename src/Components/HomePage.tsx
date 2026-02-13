import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import TournamentCard from "./TournamentCard";
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
      {/* ✅ Home SIEMPRE montada => el ad puede cargar al instante */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 8 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            // Si querés mantener hidden, ok; si ves delays raros con lazyload,
            // probá overflow: { xs: "visible", md: "hidden" }
            overflow: "hidden",
            background:
              "linear-gradient(145deg, rgba(10,14,26,0.9), rgba(11,19,35,0.9))",
            borderRadius: "18px",
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 15% 20%, rgba(242,183,5,0.06), transparent 35%), radial-gradient(circle at 80% 10%, rgba(0,255,200,0.05), transparent 30%)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.5, md: 3 },
            }}
          >
            <BelowGameAd tournament={"HOME"} />

            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                }}
              >
                Football Grid
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "3rem" },
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                Choose the Tournament
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: "640px",
                  mx: "auto",
                }}
              >
                Select a competition and dive into the grid. Every pick updates
                in real-time.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 2, sm: 2.5, md: 3 },
                gridTemplateColumns: {
                  xs: "repeat(auto-fit, minmax(180px, 1fr))",
                  sm: "repeat(auto-fit, minmax(200px, 1fr))",
                  md: "repeat(auto-fit, minmax(220px, 1fr))",
                },
              }}
            >
              {tournaments.map((t) => (
                <TournamentCard
                  key={t.id}
                  tournament={t}
                  onCardClick={handleCardClick}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ✅ Overlay opaco: no se ve NADA abajo, pero Home/ad ya cargaron */}
      {openModal && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            // opaco para que no se vea nada atrás
            background:
              "radial-gradient(circle at 10% 20%, rgba(242,183,5,0.08), transparent 30%), radial-gradient(circle at 90% 10%, rgba(33,150,243,0.06), transparent 28%), #050814",
          }}
        >
          <InstructionsCard setOpenModal={setOpenModal} />
        </Box>
      )}
    </>
  );
}
