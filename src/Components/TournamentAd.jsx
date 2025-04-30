import { useEffect, useRef } from "react";

/**
 * Props:
 * - slotId: The AdSense slot ID for the tournament
 */
export default function TournamentAd({ slotId }) {
    const adRef = useRef(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle && adRef.current) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, [slotId]);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center", marginTop: "2rem" }}
            data-ad-client="ca-pub-6840620846200583"
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
            ref={adRef}
        ></ins>
    );
}
