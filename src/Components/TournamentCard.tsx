import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { TournamentCardProps } from "../Types/types";

export default function TournamentCard({ tournament, onCardClick }: TournamentCardProps) {
    const [fitMode, setFitMode] = useState("scale-down");

    const imageUrl = `${process.env.REACT_APP_S3}/Tournament/${tournament.img}.webp`;
 
    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            const aspectRatio = img.width / img.height;
            setFitMode(aspectRatio >= 1.3 ? "cover" : "scale-down");
        };
    }, [imageUrl]);

    return (
        <Card
            onClick={() => onCardClick(tournament)}
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                background:
                    "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(242,183,5,0.5)",
                    boxShadow: "0 22px 50px rgba(0, 0, 0, 0.45)",
                },
            }}
        >
            <CardMedia
                component="img"
                loading="lazy"
                alt={tournament.name}
                src={imageUrl}
                sx={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: fitMode,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "#0e1729",
                }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.9rem",
                    flexGrow: 1,
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{
                        color: "#fdfdfd",
                        lineHeight: 1.2,
                        fontSize: { xs: "1rem", sm: "1.05rem" },
                    }}
                >
                    {tournament.name}
                </Typography>
            </CardContent>
        </Card>
    );
}
