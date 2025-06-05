import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function TournamentCard({ tournament, onCardClick }) {
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
                width: {
                    xs: "80vw", // mobile
                    sm: "45%",  // tablet
                    md: "15%",  // desktop
                },
                maxWidth: "260px",
                minWidth: "200px",
                aspectRatio: "3 / 2",
                m: 1,
                borderRadius: "1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
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
                    height: "75%",
                    objectFit: fitMode,
                    borderBottom: "1px solid #eee",
                }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem",
                    flexGrow: 1,
                }}
            >
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                    noWrap
                    sx={{
                        fontSize: {
                            xs: "0.9rem",
                            sm: "1rem",
                            md: "0.8rem"
                        },
                    }}
                >
                    {tournament.name}
                </Typography>
            </CardContent>
        </Card>
    );
}
