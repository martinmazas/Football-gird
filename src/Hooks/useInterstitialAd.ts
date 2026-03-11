import { useCallback, useEffect, useRef } from "react";

const adId = process.env.REACT_APP_AD_ID;
const AD_UNIT_PATH = `/${adId}/display_interstitial`;

export function useInterstitialAd() {
  const slotRef = useRef<googletag.Slot | null>(null);

  // Define the out-of-page interstitial slot once on mount.
  // GPT interstitials are defined once and refreshed to trigger display —
  // they must NOT be destroyed and recreated on each call.
  useEffect(() => {
    if (!window.googletag?.cmd) return;

    window.googletag.cmd.push(() => {
      const slot = window.googletag.defineOutOfPageSlot(
        AD_UNIT_PATH,
        window.googletag.enums.OutOfPageFormat.INTERSTITIAL,
      );

      // defineOutOfPageSlot returns null if the format is not supported
      // by the current browser/environment — always guard against this
      if (!slot) return;

      slot.addService(window.googletag.pubads());
      slotRef.current = slot;
      window.googletag.display(slot);
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

  // Call this to request and show the interstitial
  const triggerAd = useCallback(() => {
    window.googletag?.cmd.push(() => {
      if (slotRef.current) {
        window.googletag.pubads().refresh([slotRef.current]);
      }
    });
  }, []);

  return { triggerAd };
}
