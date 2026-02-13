import { useEffect, useRef, useState } from "react";

const HEADER_SLOT_ID = "div-gpt-header";
const adId = process.env.REACT_APP_AD_ID;
const HEADER_AD_UNIT_PATH = `/${adId}/header_leaderboard`;
const REFRESH_INTERVAL_MS = 60_000;

const HeaderAd = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<googletag.Slot | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVis = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!divRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) =>
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    );
    obs.observe(divRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!window.googletag?.cmd) return;

    window.googletag.cmd.push(() => {
      if (slotRef.current) {
        window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }

      const mapping = window.googletag
        .sizeMapping()
        .addSize(
          [1200, 0],
          [
            [970, 90],
            [728, 90],
          ],
        ) // Large desktop
        .addSize([768, 0], [[728, 90]]) // Tablet
        .addSize([0, 0], [[320, 50]]) // Mobile
        .build();

      const slot = window.googletag.defineSlot(
        HEADER_AD_UNIT_PATH,
        [
          [970, 90],
          [728, 90],
          [320, 50],
        ],
        HEADER_SLOT_ID,
      );

      if (!slot) return;

      slot.defineSizeMapping(mapping).addService(window.googletag.pubads());
      slotRef.current = slot;

      // ✅ enableServices() ya está en index.html
      window.googletag.display(HEADER_SLOT_ID);
    });

    return () => {
      window.googletag?.cmd.push(() => {
        if (slotRef.current) {
          window.googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, []);

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
        padding: "0.75rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        id={HEADER_SLOT_ID}
        ref={divRef}
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
