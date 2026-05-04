import { Box, Typography } from "@mui/material";

export default function ContactSection() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        textAlign: "center",
        py: 3,
        mt: 2,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)" }}>
        Contact:{" "}
        <Box
          component="a"
          href="mailto:webgames594@gmail.com"
          sx={{
            color: "#f2b705",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          webgames594@gmail.com
        </Box>
      </Typography>
    </Box>
  );
}
