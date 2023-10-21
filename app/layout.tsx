import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Favicon from "/public/favicon.ico";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Convert Excel to JSON Array",
    keywords: ["convert", "excel", "excel to json", "convert excel to json"],
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <html lang="en">
                <Head>
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4280450396073454"
                        crossOrigin="anonymous"></script>
                </Head>
                <body className={inter.className}>{children}</body>
            </html>
        </>
    );
}
