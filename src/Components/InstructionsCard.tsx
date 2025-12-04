import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const instructionImg = require("../images/Intro/intro.webp");

const instruction = {
  label: "instructions",
  text: "Pick a Football Grid Tournament and match the players to their teams and countries as fast as you can! All players are currently playing for the selected team. Can you complete the challenge in record time?",
  title: "Quick Guide",
};

type InstructionsProps = {
  setOpenModal: (value: boolean) => void;
};

export default function InstructionsCard({ setOpenModal }: InstructionsProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
        background:
          "radial-gradient(circle at 10% 20%, rgba(242,183,5,0.08), transparent 30%), radial-gradient(circle at 90% 10%, rgba(33,150,243,0.06), transparent 28%)",
      }}
    >
      <Card
        sx={{
          maxWidth: 760,
          width: "100%",
          background: "linear-gradient(140deg, #0f172a, #0b1224)",
          color: "white",
          borderRadius: "20px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <Button
          onClick={() => setOpenModal(false)}
          sx={{
            position: "absolute",
            top: "14px",
            right: "14px",
            minWidth: "auto",
            p: 0.5,
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            "&:hover": {
              background: "rgba(255,255,255,0.18)",
            },
          }}
        >
          <CancelIcon
            sx={{ color: "#f87171", width: "2.1rem", height: "2.1rem" }}
          />
        </Button>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
            gap: { xs: 2, md: 3 },
            alignItems: "center",
            p: { xs: 3, sm: 4 },
          }}
        >
          <CardMedia
            component="img"
            src={instructionImg}
            alt={instruction.label}
            sx={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              maxHeight: { xs: 240, md: 320 },
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background:
                "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05), transparent 55%)",
            }}
          />
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.16em",
              }}
            >
              {instruction.label}
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1, lineHeight: 1.1 }}
            >
              {instruction.title}
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.82)"
              sx={{ lineHeight: 1.7, mb: 2 }}
            >
              {instruction.text}
            </Typography>
            <Button
              onClick={() => setOpenModal(false)}
              sx={{
                mt: 1,
                background: "linear-gradient(120deg, #f2b705, #ffb347)",
                color: "#0b1224",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "10px",
                padding: "0.85rem 1.4rem",
                textTransform: "none",
                boxShadow: "0 20px 30px rgba(242,183,5,0.25)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 26px 40px rgba(242,183,5,0.3)",
                  background: "linear-gradient(120deg, #ffd166, #f2b705)",
                },
              }}
            >
              Choose Tournament
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
