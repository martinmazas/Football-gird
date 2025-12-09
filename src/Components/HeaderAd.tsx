import { useEffect, useRef } from "react";

const HEADER_SLOT_ID = "div-gpt-header";
const HEADER_AD_UNIT_PATH = "/23297979034/header_leaderboard";
const REFRESH_INTERVAL_MS = 60_000;

/**
 * Simple responsive leaderboard for the app header.
 */
const HeaderAd = () => {
  const adRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<googletag.Slot | null>(null);

  useEffect(() => {
    let intervalId: number | null = null;

    if (!window.googletag?.pubads) return;

    window.googletag.cmd.push(() => {
      try {
        // Clean up existing instance for hot reloads or navigations
        if (slotRef.current) {
          window.googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }

        const mapping = window.googletag
          .sizeMapping()
          .addSize(
            [1024, 0],
            [
              [970, 90],
              [728, 90],
            ]
          )
          .addSize([768, 0], [[728, 90]])
          .addSize([0, 0], [[320, 50]])
          .build();

        const slot = window.googletag.defineSlot(
          HEADER_AD_UNIT_PATH,
          [
            [970, 90],
            [728, 90],
            [320, 50],
          ],
          HEADER_SLOT_ID
        );

        if (!slot) return;

        slot.defineSizeMapping(mapping).addService(window.googletag.pubads());
        slotRef.current = slot;

        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display(HEADER_SLOT_ID);

        // Periodic refresh (60s)
        intervalId = window.setInterval(() => {
          if (window.googletag?.pubads && slotRef.current) {
            window.googletag.pubads().refresh([slotRef.current]);
          }
        }, REFRESH_INTERVAL_MS);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("HeaderAd error:", e);
      }
    });

    return () => {
      if (intervalId !== null) window.clearInterval(intervalId);

      window.googletag?.cmd.push(() => {
        if (slotRef.current) {
          try {
            window.googletag.destroySlots([slotRef.current]);
          } finally {
            slotRef.current = null;
          }
        }
      });
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0.75rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        id={HEADER_SLOT_ID}
        ref={adRef}
        style={{
          width: "100%",
          maxWidth: "980px",
          minHeight: "90px",
          textAlign: "center",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default HeaderAd;
