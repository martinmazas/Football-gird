import { useEffect, useMemo, useRef, useState } from "react";
import { cleanTournamentName } from "../Utils/formatters";

const adId = process.env.REACT_APP_AD_ID;

const adConfig: Record<string, { adUnitPath: string; slotId: string }> = {
  HOME: { adUnitPath: `/${adId}/below_game_table`, slotId: "div-gpt-ad" },
  "CHAMPIONS LEAGUE": {
    adUnitPath: `/${adId}/below_game_table_cl`,
    slotId: "div-gpt-ad-cl",
  },
  LIBERTADORES: {
    adUnitPath: `/${adId}/below_game_table_lib`,
    slotId: "div-gpt-ad-lib",
  },
  MLS: {
    adUnitPath: `/${adId}/below_game_table_mls`,
    slotId: "div-gpt-ad-mls",
  },
  "FIFA CLUB WORLD CUP": {
    adUnitPath: `/${adId}/below_game_table_mundial`,
    slotId: "div-gpt-ad-mundial",
  },
  "PREMIER LEAGUE": {
    adUnitPath: `/${adId}/below_game_table_premier`,
    slotId: "div-gpt-ad-premier",
  },
  "LA LIGA": {
    adUnitPath: `/${adId}/below_game_table_laliga`,
    slotId: "div-gpt-ad-laliga",
  },
  "SERIE A": {
    adUnitPath: `/${adId}/below_game_table_seriea`,
    slotId: "div-gpt-ad-seriea",
  },
  "AFC CHAMPIONS LEAGUE": {
    adUnitPath: `/${adId}/below_game_table_afc`,
    slotId: "div-gpt-ad-afc",
  },
  BUNDESLIGA: {
    adUnitPath: `/${adId}/below_game_table_bundesliga`,
    slotId: "div-gpt-ad-bundesliga",
  },
  "EUROPE LEAGUE": {
    adUnitPath: `/${adId}/below_game_table_europaleague`,
    slotId: "div-gpt-ad-europaleague",
  },
  CONCACAF: {
    adUnitPath: `/${adId}/below_game_table_concacaf`,
    slotId: "div-gpt-ad-concacaf",
  },
};

type Props = { tournament: string | null };

export default function BelowGameAd({ tournament }: Props) {
  const config = useMemo(() => {
    const key = cleanTournamentName(tournament) || "HOME";
    return adConfig[key] || adConfig.HOME;
  }, [tournament]);

  const divRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<googletag.Slot | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(!document.hidden);

  const REFRESH_INTERVAL_MS = 60_000;

  // Tab visibility
  useEffect(() => {
    const onVis = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Slot visibility (50% in view)
  useEffect(() => {
    if (!divRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) =>
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    );

    obs.observe(divRef.current);
    return () => obs.disconnect();
  }, [config.slotId]);

  // Define + display
  useEffect(() => {
    if (!window.googletag?.cmd) return;

    window.googletag.cmd.push(() => {
      if (slotRef.current) {
        window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }

      // ✅ Better mapping: mobile / tablet / desktop
      const mapping = window.googletag
        .sizeMapping()
        .addSize([1024, 0], [[728, 90]]) // Desktop
        .addSize(
          [600, 0],
          [
            [728, 90],
            [300, 250],
          ],
        ) // Tablet (both allowed)
        .addSize(
          [0, 0],
          [
            [300, 250],
            [320, 50],
          ],
        ) // Mobile (try 300x250 first)
        .build();

      // Important: defineSlot gets the superset of sizes
      const slot = window.googletag.defineSlot(
        config.adUnitPath,
        [
          [728, 90],
          [300, 250],
          [320, 50],
        ],
        config.slotId,
      );

      if (!slot) return;

      slot.defineSizeMapping(mapping).addService(window.googletag.pubads());
      slotRef.current = slot;

      // ✅ enableServices() ya está en index.html
      window.googletag.display(config.slotId);
    });

    return () => {
      window.googletag?.cmd.push(() => {
        if (slotRef.current) {
          window.googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, [config.adUnitPath, config.slotId]);

  // Refresh only when visible + tab visible
  useEffect(() => {
    if (!isVisible || !isTabVisible) return;

    const id = window.setInterval(() => {
      window.googletag?.cmd?.push(() => {
        if (slotRef.current) {
          window.googletag.pubads().refresh([slotRef.current]);
        }
      });
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [isVisible, isTabVisible]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0",
        overflowX: "hidden",
      }}
    >
      <div
        id={config.slotId}
        ref={divRef}
        style={{
          width: "100%",
          maxWidth: "728px",
          // ✅ reserve enough for 300x250 on mobile/tablet to avoid CLS
          minHeight: "250px",
          textAlign: "center",
        }}
      />
    </div>
  );
}
