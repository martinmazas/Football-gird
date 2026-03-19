import { useCallback, useRef } from "react";

const EVERY_N_RESTARTS = 500;

export function useInterstitialAd(onShow: () => void) {
  const restartCountRef = useRef(0);

  const onRestart = useCallback(() => {
    restartCountRef.current += 1;
    if (restartCountRef.current % EVERY_N_RESTARTS === 0) {
      onShow();
    }
  }, [onShow]);

  return { onRestart };
}
