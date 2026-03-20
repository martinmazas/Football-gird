import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InterstitialOverlay({ open, onClose }: Props) {
  const [countdown, setCountdown] = useState(3);
  const canClose = countdown === 0;

  useEffect(() => {
    if (!open) {
      setCountdown(3);
      return;
    }

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("[InterstitialOverlay] AdSense push error:", e);
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
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
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {countdown}
              </Typography>
            </Box>
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

        {canClose && (
          <Typography
            sx={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
            }}
          >
            Tap anywhere outside to close
          </Typography>
        )}
      </Box>
    </Box>
  );
}
