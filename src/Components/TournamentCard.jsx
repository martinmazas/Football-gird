import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function TournamentCard({ tournament, onCardClick }) {
    const [fitMode, setFitMode] = useState("scale-down");

    useEffect(() => {
        const img = new Image();
        img.src = `https://db3l8v64ekfvu.cloudfront.net/Tournament/${tournament.img}.webp`;

        img.onload = () => {
            const aspectRatio = img.width / img.height;
            setFitMode(aspectRatio >= 1.3 ? "cover" : "scale-down");
        };
    }, [tournament.img]);

    return (
        <Card
            sx={{
                width: { xs: "90%", sm: "48%", md: "30%" },
                height: "14rem", // Reduced height for the card
                maxWidth: "350px",
                borderRadius: "1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                backgroundColor: "#ffffff", // Lighter background for a modern, clean look
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for a more friendly feel
                transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition for hover
                "&:hover": {
                    transform: "scale(1.03)", // Slightly scale for a soft effect
                    boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.15)", // Lighter but larger shadow on hover
                },
            }}
            onClick={() => onCardClick(tournament)}
        >
            <CardMedia
                component="img"
                loading="lazy"
                alt={tournament.name}
                src={`https://db3l8v64ekfvu.cloudfront.net/Tournament/${tournament.img}.webp`}
                sx={{
                    height: "60%", // Reduced height of the image to make it smaller
                    width: "100%",
                    objectFit: fitMode,
                    borderBottom: "1px solid #eee", // Light border for separation
                }}
            />
            <CardContent
                sx={{
                    textAlign: "center",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                }}
            >
                <Typography variant="h6" color="text.primary" fontWeight="bold">
                    {tournament.name}
                </Typography>
            </CardContent>
        </Card>

    );
}