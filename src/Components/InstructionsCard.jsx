import { Card, CardContent, Typography, Box, CardMedia, Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const instructionImg = require("../images/Intro/intro.jpeg");
const instruction = {
    "label": "instructions",
    "text": "Pick a Football Grid Tournament and match the players to their teams and countries as fast as you can! All players are currently playing for the selected team. Can you complete the challenge in record time?",
    "title": "Quick Guide"
};

export default function InstructionsCard(props) {
    const { setOpenModal } = { ...props };

    const styles = {
        openModalBox: {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            padding: 0,
            minWidth: 'auto',
            zIndex: 2
        },
        cancelIcon: {
            color: 'error.main',
            fontSize: 'large',
            width: '2.5rem',
            height: '2.5rem'
        },
        chooseButton: {
            mt: 2,
            background: "linear-gradient(45deg, #f2b705, #f2b705)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "8px",
            padding: "0.8rem 1.5rem",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
                background: "linear-gradient(45deg, #f2b705, #f2b705)",
                transform: "scale(1.05)",
            },
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: "3rem", md: "5rem" },
            }}
        >
            <Card
                sx={{
                    maxWidth: { xs: 340, md: 500 },
                    backgroundColor: "#262335",
                    color: "white",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgb(249, 248, 248)",
                    textAlign: "center",
                    p: 2,
                    position: 'relative',
                    paddingTop: '3rem'
                }}
            >
                <Button
                    sx={styles.openModalBox}
                    onClick={() => setOpenModal(false)}
                >
                    <CancelIcon sx={styles.cancelIcon} />
                </Button>
                <CardMedia
                    component="img"
                    src={instructionImg}
                    alt={instruction.label}
                    sx={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 'auto',
                        maxHeight: { xs: 180, md: 240 },
                        borderRadius: "8px",
                    }}
                />
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        {instruction.title}
                    </Typography>
                    <Typography variant="body1" color="grey.300">
                        {instruction.text}
                    </Typography>
                </CardContent>
            </Card>

            {/* Choose Tournament Button */}
            <Button sx={styles.chooseButton} onClick={() => setOpenModal(false)}>
                Choose Tournament
            </Button>
        </Box>
    );
}
