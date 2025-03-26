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
                height: "16rem",
                maxWidth: "350px",
                boxShadow: 4,
                borderRadius: "1rem",
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": {
                    transform: "scale(1.05)",
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
                    height: "80%",
                    width: "100%",
                    objectFit: fitMode,
                }}
            />
            <CardContent
                sx={{
                    textAlign: "center",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    {tournament.name}
                </Typography>
            </CardContent>
        </Card>
    );
}