import React, { useEffect } from "react";

const GoogleAds = () => {
    useEffect(() => {
        const pushAd = () => {
            try {
                const adsbygoogle = (window as any).adsbygoogle;
                adsbygoogle?.push?.();
            } catch (e) {
                console.error(e);
            }
        };

        let interval = setInterval(() => {
            if ((window as any).adsbygoogle) {
                pushAd();
                clearInterval(interval);
            }
        }, 300);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4280450396073454"
            data-ad-slot="9253460526"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    );
};

export default GoogleAds;
