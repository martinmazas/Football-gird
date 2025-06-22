import { useEffect, useRef } from "react";
import { cleanTournamentName } from "../Utils/formatters";

// Mapping tournament to adUnitPath and slotId
const adConfig = {
    HOME: {
        adUnitPath: "/23297979034/below_game_table",
        slotId: "div-gpt-ad",
    },
    'CHAMPIONS LEAGUE': {
        adUnitPath: "/23297979034/below_game_table_cl",
        slotId: "div-gpt-ad-cl",
    },
    LIBERTADORES: {
        adUnitPath: "/23297979034/below_game_table_lib",
        slotId: "div-gpt-ad-lib",
    },
    MLS: {
        adUnitPath: "/23297979034/below_game_table_mls",
        slotId: "div-gpt-ad-mls",
    },
    'FIFA CLUB WORLD CUP': {
        adUnitPath: "/23297979034/below_game_table_mundial",
        slotId: "div-gpt-ad-mundial",
    },
    'PREMIER LEAGUE': {
        adUnitPath: "/23297979034/below_game_table_premier",
        slotId: "div-gpt-ad-premier",
    },
    'LA LIGA': {
        adUnitPath: "/23297979034/below_game_table_laliga",
        slotId: "div-gpt-ad-laliga",
    },
    'SERIE A': {
        adUnitPath: "/23297979034/below_game_table_seriea",
        slotId: "div-gpt-ad-seriea",
    },
    'AFC CHAMPIONS LEAGUE': {
        adUnitPath: "/23297979034/below_game_table_afc",
        slotId: "div-gpt-ad-afc",
    },
    BUNDESLIGA: {
        adUnitPath: "/23297979034/below_game_table_bundesliga",
        slotId: "div-gpt-ad-bundesliga",
    },
    'EUROPE LEAGUE': {
        adUnitPath: "/23297979034/below_game_table_europaleague",
        slotId: "div-gpt-ad-europaleague",
    },
    CONCACAF: {
        adUnitPath: "/23297979034/below_game_table_concacaf",
        slotId: "div-gpt-ad-concacaf",
    },
};

export default function BelowGameAd({ tournament }) {
    const config = adConfig[cleanTournamentName(tournament)];
    const adRef = useRef(null);
    const slot = useRef(null);
    const refreshInterval = 60000;

    useEffect(() => {
        if (!config || !window.googletag?.pubads) return;

        let intervalId;
        let observer;

        window.googletag.cmd.push(() => {
            try {
                // Remove existing slots to prevent duplication
                window.googletag.destroySlots();

                // Define size mapping for responsive ads
                const mapping = window.googletag.sizeMapping()
                    .addSize([728, 0], [[728, 90]])   // Desktop
                    .addSize([0, 0], [[320, 50]])     // Mobile
                    .build();

                // Define the ad slot with responsive sizes
                slot.current = window.googletag
                    .defineSlot(config.adUnitPath, [[728, 90], [320, 50]], config.slotId)
                    .defineSizeMapping(mapping)
                    .addService(window.googletag.pubads());

                window.googletag.pubads().enableSingleRequest();
                window.googletag.enableServices();
                window.googletag.display(config.slotId);
            } catch (e) {
                console.error("AdManager error:", e);
            }
        });

        if (IntersectionObserver && adRef.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        intervalId = setInterval(() => {
                            if (window.googletag?.pubads && slot.current) {
                                window.googletag.pubads().refresh([slot.current]);
                            }
                        }, refreshInterval);
                        observer.disconnect();
                    }
                },
                { threshold: 0.5 }
            );
            observer.observe(adRef.current);
        }

        return () => {
            observer?.disconnect();
            clearInterval(intervalId);
        };
    }, [config]);

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem 0',
                overflowX: 'hidden',
            }}
        >
            <div
                id={config?.slotId}
                ref={adRef}
                style={{
                    width: '100%',
                    maxWidth: '728px',
                    minHeight: '90px', // reserve height to avoid layout shift
                    textAlign: 'center',
                }}
            />
        </div>
    );
}