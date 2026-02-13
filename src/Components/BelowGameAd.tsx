import { useEffect, useRef } from "react";
import { cleanTournamentName } from "../Utils/formatters";
const adId = process.env.REACT_APP_AD_ID;

// Mapping tournament to adUnitPath and slotId
const adConfig: Record<string, { adUnitPath: string; slotId: string }> = {
  HOME: {
    adUnitPath: `/${adId}/below_game_table`,
    slotId: "div-gpt-ad",
  },
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

const BelowGameAd = ({ tournament }: Props) => {
  const config = adConfig[cleanTournamentName(tournament)];
  const adRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<googletag.Slot | null>(null);
  const refreshIntervalMs = 60_000;

  useEffect(() => {
    if (!config || !window.googletag?.pubads) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let observer: IntersectionObserver | null = null;

    window.googletag.cmd.push(() => {
      try {
        // Destroy ONLY this component's previous slot
        if (slotRef.current) {
          window.googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }

        // Responsive size mapping
        const mapping = window.googletag
          .sizeMapping()
          .addSize([728, 0], [[728, 90]]) // Desktop
          .addSize([0, 0], [[320, 50]]) // Mobile
          .build();

        // Define the ad slot with responsive sizes
        const slot = window.googletag.defineSlot(
          config.adUnitPath,
          [
            [728, 90],
            [320, 50],
          ],
          config.slotId,
        );

        if (!slot) return;

        slot.defineSizeMapping(mapping).addService(window.googletag.pubads());
        slotRef.current = slot;

        // Safe to call multiple times; GPT guards internally
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();

        // Display the slot
        window.googletag.display(config.slotId);
      } catch (e) {
        // Keep failures non-fatal to your app
        // eslint-disable-next-line no-console
        console.error("AdManager error:", e);
      }
    });

    // Start refreshing ONLY after it was ≥50% in view once
    if ("IntersectionObserver" in window && adRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting && entry.intersectionRatio >= 0.5) {
            intervalId = setInterval(() => {
              if (window.googletag?.pubads && slotRef.current) {
                window.googletag.pubads().refresh([slotRef.current]);
              }
            }, refreshIntervalMs);
            observer?.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(adRef.current);
    }

    // Cleanup
    return () => {
      observer?.disconnect();
      if (intervalId) clearInterval(intervalId);

      window.googletag?.cmd.push(() => {
        if (slotRef.current) {
          try {
            window.googletag.destroySlots([slotRef.current]);
          } catch {
            // ignore
          } finally {
            slotRef.current = null;
          }
        }
      });
    };
  }, [config]);

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
        id={config?.slotId}
        ref={adRef}
        style={{
          width: "100%",
          maxWidth: "728px",
          minHeight: "90px", // reserve height to avoid layout shift
          textAlign: "center",
        }}
      />
      {/* <h1>BELLOW</h1> */}
    </div>
  );
};

export default BelowGameAd;
