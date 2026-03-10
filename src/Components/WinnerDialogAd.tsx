import { useEffect, useRef, useState } from "react";

const SLOT_ID = "div-gpt-winner";
const adId = process.env.REACT_APP_AD_ID;
const AD_UNIT_PATH = `/${adId}/winner_dialog`;
const REFRESH_INTERVAL_MS = 60_000;

export default function WinnerDialogAd() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<googletag.Slot | null>(null);
  const [isTabVisible, setIsTabVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVis = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!window.googletag?.cmd) return;

    window.googletag.cmd.push(() => {
      if (slotRef.current) {
        window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }

      const slot = window.googletag.defineSlot(
        AD_UNIT_PATH,
        [[300, 250]],
        SLOT_ID,
      );

      if (!slot) return;

      slot.addService(window.googletag.pubads());
      slotRef.current = slot;
      window.googletag.display(SLOT_ID);
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

  // Refresh while tab is visible (dialog stays open)
  useEffect(() => {
    if (!isTabVisible) return;

    const id = window.setInterval(() => {
      window.googletag?.cmd?.push(() => {
        if (slotRef.current) {
          window.googletag.pubads().refresh([slotRef.current]);
        }
      });
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [isTabVisible]);

  return (
    <div
      ref={divRef}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        minHeight: "250px",
      }}
    >
      <div id={SLOT_ID} />
    </div>
  );
}
