"use client";

import React, { useEffect } from "react";

const GoogleAds = () => {
    useEffect(() => {
        try {
            const adsbygoogle = (window as any).adsbygoogle;
            adsbygoogle?.push?.({});
        } catch (e) {
            console.error(e);
        }
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
