import { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InterstitialOverlay({ open, onClose }: Props) {
  // Load the AdSense ad when overlay opens
  useEffect(() => {
    if (!open) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("[InterstitialOverlay] AdSense push error:", e);
    }
  }, [open]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(5, 9, 20, 0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "300px",
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Advertisement
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "rgba(255,255,255,0.5)" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* AdSense 300×250 */}
      <Box
        sx={{
          width: "300px",
          height: "250px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "300px", height: "250px" }}
          data-ad-client="ca-pub-6840620846200583"
          data-ad-slot="3941751291"
          data-ad-format="fixed"
        />
      </Box>
    </Box>
  );
}
