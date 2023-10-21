"use client";

import React, { useEffect } from "react";

const GoogleAds = () => {
    useEffect(() => {
        const checkAdsbygoogle = () => {
            if ((window as any).adsbygoogle && (window as any).adsbygoogle.push) {
                (window as any).adsbygoogle.push({});
            } else {
                console.warn("adsbygoogle.push is not available.");
            }
        };

        let interval: any;
        const timeout = 10000;

        if ((window as any).adsbygoogle && (window as any).adsbygoogle.push) {
            checkAdsbygoogle();
        } else {
            interval = setInterval(checkAdsbygoogle, 1000);
        }

        const timeoutId = setTimeout(() => {
            clearInterval(interval);
            console.error("Adsense script did not load within the specified timeout.");
        }, timeout);

        return () => {
            clearInterval(interval);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4280450396073454"
                data-ad-slot="9253460526"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </>
    );
};

export default GoogleAds;
