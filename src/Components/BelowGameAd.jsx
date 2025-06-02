import { useEffect, useRef } from "react";

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
    const config = adConfig[tournament.toUpperCase().replace(/\s\d+(\/*\d+)?/, '').trim()];
    const adRef = useRef(null);

    useEffect(() => {
        if (!config || !window.googletag?.pubads) return;

        window.googletag.cmd.push(() => {
            try {
                // Clear existing slot to avoid duplication
                window.googletag.destroySlots();

                window.googletag
                    .defineSlot(config.adUnitPath, [[728, 90], [320, 50]], config.slotId)
                    .addService(window.googletag.pubads());

                window.googletag.pubads().enableSingleRequest();
                window.googletag.enableServices();
                window.googletag.display(config.slotId);
            } catch (e) {
                console.error("AdManager error:", e);
            }
        });
    }, [config]);

    return (
        <div
            id={config?.slotId}
            ref={adRef}
            style={{ minWidth: "320px", minHeight: "50px", textAlign: "center", marginTop: "2rem" }}
        ></div>
    );
}
