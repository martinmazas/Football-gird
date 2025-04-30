import { useEffect, useRef } from "react";

export default function AdBanner({ slotId }) {
    const adRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                if (window.adsbygoogle && adRef.current) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }, 500); // delay to ensure layout is complete

        return () => clearTimeout(timeout); // cleanup if component unmounts
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
