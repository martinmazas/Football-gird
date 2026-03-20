import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InterstitialOverlay({ open, onClose }: Props) {
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!open) {
      setCanClose(false);
      return;
    }

    // Allow close after 3 seconds (gives ad time to load and get an impression)
    const timer = setTimeout(() => setCanClose(true), 3000);

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("[InterstitialOverlay] AdSense push error:", e);
    }

    return () => clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return (
    <Box
      onClick={canClose ? onClose : undefined}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(5, 9, 20, 0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        backdropFilter: "blur(4px)",
        cursor: canClose ? "pointer" : "default",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
          maxWidth: "500px",
          px: 2,
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
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
          {canClose ? (
            <IconButton onClick={onClose} size="small" sx={{ color: "rgba(255,255,255,0.7)" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : (
            <Typography
              sx={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
              }}
            >
              Close in 3s…
            </Typography>
          )}
        </Box>

        {/* Ad — full width of container, AdSense picks best size */}
        <Box
          sx={{
            width: "100%",
            minHeight: "250px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: "250px" }}
            data-ad-client="ca-pub-6840620846200583"
            data-ad-slot="3941751291"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </Box>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.65rem",
            letterSpacing: "0.06em",
          }}
        >
          {canClose ? "Tap anywhere outside to close" : ""}
        </Typography>
      </Box>
    </Box>
  );
}
