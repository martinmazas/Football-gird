import React, { useEffect, useId, useRef, useState } from "react";

type Props = {
  tournament?: string;
  /** delay before showing the sticky */
  showDelayMs?: number;
  /** min height of the video box (visual skeleton) */
  minHeight?: number;   // default 120
  /** max height clamp (clips tall creatives) */
  maxHeight?: number;   // default 220
  /** only show on screens >= this width (px) */
  minViewportWidth?: number; // default 360
  onDisplayed?: () => void;
  onClose?: () => void;
};

const AD_UNIT_PATH = "/23297979034/fg_outstream_1";
const AD_SIZE: googletag.GeneralSize = "fluid";

let stickyInUse = false;

const StickyOutstreamFooter: React.FC<Props> = ({
  tournament,
  showDelayMs = 2500,
  minHeight = 120,
  maxHeight = 220,
  minViewportWidth = 360,
  onDisplayed,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState(false);
  const [closed, setClosed] = useState(false);
  const [hasFill, setHasFill] = useState<boolean | null>(null); // null = unknown, true = filled, false = empty

  const divId = useId().replace(/:/g, "_");
  const slotRef = useRef<googletag.Slot | null>(null);

  useEffect(() => {
    // respect viewport threshold (avoid tiny devices)
    if (window.innerWidth < minViewportWidth) return;
    if (!window.googletag?.pubads) return;
    if (stickyInUse) return;
    stickyInUse = true;

    const openTimer = window.setTimeout(() => setVisible(true), showDelayMs);

    const onSlotRender = (e: googletag.events.SlotRenderEndedEvent) => {
      if (slotRef.current && e.slot === slotRef.current) {
        if (e.isEmpty) {
          setHasFill(false);
          setVisible(false); // hide if no ad
        } else {
          setHasFill(true);
        }
      }
    };

    window.googletag.cmd.push(() => {
      // listen for render result
      window.googletag.pubads().addEventListener("slotRenderEnded", onSlotRender);

      // define only this slot
      const slot = window.googletag.defineSlot(AD_UNIT_PATH, AD_SIZE, divId);
      if (!slot) return;

      slot.addService(window.googletag.pubads());
      slotRef.current = slot;

      if (tournament) {
        window.googletag.pubads().setTargeting("tournament", String(tournament));
      }

      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });

    return () => {
      window.clearTimeout(openTimer);
      window.googletag?.cmd.push(() => {
        try {
          window.googletag.pubads().removeEventListener("slotRenderEnded", onSlotRender as any);
        } catch {}
        if (slotRef.current) {
          try { window.googletag.destroySlots([slotRef.current]); } catch {}
          slotRef.current = null;
        }
        stickyInUse = false;
      });
    };
  }, [divId, showDelayMs, minViewportWidth, tournament]);

  useEffect(() => {
    if (closed || displayed || !visible) return;
    window.googletag?.cmd.push(() => {
      window.googletag.display(divId);
      setDisplayed(true);
      onDisplayed?.();
    });
  }, [closed, displayed, visible, divId, onDisplayed]);

  if (closed || !visible) return null;

  // If render came back empty, we already hid it; guard anyway:
  if (hasFill === false) return null;

  return (
    <div
      aria-label="sponsored video"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483000,
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 820,
          padding: "6px 10px calc(6px + env(safe-area-inset-bottom))",
          background: "rgba(18,18,18,0.98)",
          boxShadow: "0 -6px 16px rgba(0,0,0,0.35)",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 11, opacity: 0.7 }}>Sponsored</span>
          <button
            aria-label="Close ad"
            onClick={() => { setClosed(true); onClose?.(); }}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 18,
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0.85,
            }}
          >
            ×
          </button>
        </div>

        {/* slot wrapper — compact & clipped */}
        <div
          id={divId}
          style={{
            width: "100%",
            minHeight,            // smaller skeleton while loading
            maxHeight,            // clip tall creatives; reduces “visual noise”
            overflow: "hidden",
            borderRadius: 12,
            background: "#111",
          }}
        />
      </div>
    </div>
  );
};

export default StickyOutstreamFooter;
