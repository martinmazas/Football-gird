import React, { useEffect, useId, useRef, useState } from "react";

type Props = {
  /** Optional key-value (e.g., "UCL", "Libertadores") to segment reports in GAM */
  tournament?: string;
  /** Delay before showing the sticky (ms) */
  showDelayMs?: number;
  /** Called once when GPT actually displays the slot */
  onDisplayed?: () => void;
  /** Called when user closes the sticky */
  onClose?: () => void;
};

/** Your out-stream/non-instream video ad unit */
const AD_UNIT_PATH = "/23297979034/fg_outstream_1";
/** Use fluid for responsive out-stream */
const AD_SIZE: googletag.GeneralSize = "fluid";

/** Prevent multiple sticky footers at once */
let stickyInUse = false;

const StickyOutstreamFooter: React.FC<Props> = ({
  tournament,
  showDelayMs = 3500,
  onDisplayed,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState(false);
  const [closed, setClosed] = useState(false);

  const divId = useId().replace(/:/g, "_");
  const slotRef = useRef<googletag.Slot | null>(null);

  // Define the slot on mount (do NOT destroy all slots!)
  useEffect(() => {
    if (!window.googletag?.pubads) return;
    if (stickyInUse) return; // only one sticky at a time
    stickyInUse = true;

    const openTimer = window.setTimeout(() => setVisible(true), showDelayMs);

    window.googletag.cmd.push(() => {
      // Define only this slot
      const slot = window.googletag.defineSlot(AD_UNIT_PATH, AD_SIZE, divId);
      if (!slot) return;

      slot.addService(window.googletag.pubads());
      slotRef.current = slot;

      // Optional key-value targeting for your reports
      if (tournament) {
        window.googletag
          .pubads()
          .setTargeting("tournament", String(tournament));
      }

      // Safe to call multiple times, GPT guards internally
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });

    return () => {
      window.clearTimeout(openTimer);
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
        stickyInUse = false;
      });
    };
  }, [divId, showDelayMs, tournament]);

  // Display once the bar becomes visible
  useEffect(() => {
    if (closed || displayed || !visible) return;
    window.googletag?.cmd.push(() => {
      window.googletag.display(divId);
      setDisplayed(true);
      onDisplayed?.();
    });
  }, [closed, displayed, visible, divId, onDisplayed]);

  if (closed) return null;

  return (
    <div
      aria-label="sponsored video"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483000,
        display: visible ? "block" : "none",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 820,
          padding: "8px 12px calc(8px + env(safe-area-inset-bottom))",
          background: "rgba(18,18,18,0.98)",
          boxShadow: "0 -6px 18px rgba(0,0,0,0.35)",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          color: "#fff",
        }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.7 }}>Sponsored</span>
          <button
            aria-label="Close ad"
            onClick={() => {
              setClosed(true);
              onClose?.();
            }}
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

        {/* the out-stream slot (fluid) */}
        <div
          id={divId}
          style={{
            width: "100%",
            minHeight: 180, // prevents “empty bar” while loading
            maxHeight: "42vh", // don’t cover too much of the game
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
