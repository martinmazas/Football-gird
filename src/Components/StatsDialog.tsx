import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStats } from "../Hooks/useStats";
import tournamentsData from "../Utils/tournaments.json";

type StatsDialogProps = {
  open: boolean;
  onClose: () => void;
  currentTournament: string | null;
};

export default function StatsDialog({ open, onClose, currentTournament }: StatsDialogProps) {
  const { getAll } = useStats();
  const allStats = getAll();

  // All known tournament names in order
  const allTournaments = tournamentsData.map((t) => t.name);

  // Default to currentTournament tab, fallback to first tournament with data, then first overall
  const defaultTab = (() => {
    if (currentTournament && allTournaments.includes(currentTournament)) return currentTournament;
    const firstWithData = allTournaments.find((t) => allStats[t]);
    return firstWithData ?? allTournaments[0];
  })();

  const [selectedTab, setSelectedTab] = useState(defaultTab);

  // Sync selected tab when dialog opens
  useEffect(() => {
    if (open) setSelectedTab(defaultTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const stats = allStats[selectedTab];
  const maxCount = stats ? Math.max(...stats.distribution, 1) : 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          background: "linear-gradient(145deg, #0d1628, #111827)",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "#e8ecf5",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
          pb: 0,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Statistics
      </DialogTitle>

      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pt: 1, px: { xs: 1.5, sm: 3 } }}>
        {/* Tournament Tabs */}
        <Tabs
          value={selectedTab}
          onChange={(_, val) => setSelectedTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            "& .MuiTab-root": {
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.7rem",
              minWidth: "fit-content",
              px: 1.5,
              textTransform: "none",
            },
            "& .Mui-selected": { color: "#f2b705 !important" },
            "& .MuiTabs-indicator": { backgroundColor: "#f2b705" },
          }}
        >
          {allTournaments.map((name) => (
            <Tab
              key={name}
              value={name}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {name}
                  {allStats[name] && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.6rem",
                        background: "rgba(242,183,5,0.2)",
                        color: "#f2b705",
                        borderRadius: "4px",
                        px: 0.5,
                        py: 0.1,
                      }}
                    >
                      {allStats[name].gamesPlayed}
                    </Box>
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>

        {/* Distribution */}
        {!stats ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}>
              No games played yet for this tournament.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>
                Correct guesses
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>
                {stats.gamesPlayed} game{stats.gamesPlayed !== 1 ? "s" : ""} played
              </Typography>
            </Box>

            {stats.distribution.map((count, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* Label */}
                <Typography
                  sx={{
                    width: "14px",
                    textAlign: "right",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.6)",
                    flexShrink: 0,
                  }}
                >
                  {i}
                </Typography>

                {/* Bar */}
                <Box sx={{ flex: 1, position: "relative", height: "28px" }}>
                  <Box
                    sx={{
                      height: "100%",
                      minWidth: count > 0 ? "28px" : "4px",
                      width: `${(count / maxCount) * 100}%`,
                      background:
                        i === 9
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : count > 0
                          ? "linear-gradient(90deg, rgba(242,183,5,0.7), rgba(242,183,5,0.9))"
                          : "rgba(255,255,255,0.06)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      pr: 1,
                      transition: "width 0.4s ease",
                    }}
                  >
                    {count > 0 && (
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: i === 9 ? "#fff" : "#0b1224",
                          lineHeight: 1,
                        }}
                      >
                        {count}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
