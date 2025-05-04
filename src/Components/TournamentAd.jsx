import { useEffect, useRef } from "react";

export default function TournamentAd({ slotId }) {
    const adRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                if (
                    window.adsbygoogle &&
                    adRef.current &&
                    adRef.current.offsetWidth > 0
                ) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [slotId]);

    return (
        <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", minHeight: "100px" }}
                data-ad-client="ca-pub-6840620846200583"
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
                ref={adRef}
            ></ins>
        </div>
    );
}
