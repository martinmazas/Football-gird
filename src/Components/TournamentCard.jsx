import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function TournamentCard({ tournament, onCardClick }) {
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
            onClick={() => onCardClick(tournament)} // Ensure click works
        >
            <CardMedia
                component="img"
                alt={tournament.name}
                src={`https://football-grid-s3.s3.us-east-2.amazonaws.com/Tournaments/${tournament.img}.jpeg`}
                sx={{
                    height: "80%",
                    width: "100%",
                    objectFit: "cover",
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
