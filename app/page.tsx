"use client";

import { scaleOrdinal } from "d3";
import { SankeyGraph, sankey, sankeyCenter, sankeyLinkHorizontal } from "d3-sankey";

const data = {
    nodes: [
        { name: "A", category: "A" },
        { name: "B", category: "B" },
        { name: "C", category: "C" },
        { name: "D", category: "D" },
        { name: "E", category: "E" },
        { name: "F", category: "F" },
        { name: "G", category: "G" },
        { name: "H", category: "H" },
        { name: "I", category: "I" },
        { name: "J", category: "J" },
        { name: "K", category: "K" },
        { name: "L", category: "L" },
        { name: "M", category: "M" },
        { name: "N", category: "N" },
        { name: "O", category: "O" },
        { name: "P", category: "P" },
        { name: "Q", category: "Q" },
        { name: "R", category: "R" },
        { name: "S", category: "S" },
        { name: "T", category: "T" },
        { name: "U", category: "U" },
        { name: "V", category: "V" },
        { name: "W", category: "W" },
        { name: "X", category: "X" },
        { name: "Y", category: "Y" },
        { name: "Z", category: "Z" },
        { name: "AA", category: "AA" },
        { name: "BB", category: "BB" },
        { name: "CC", category: "CC" },
        { name: "DD", category: "DD" },
        { name: "EE", category: "EE" },
        { name: "FF", category: "FF" },
        { name: "GG", category: "GG" },
        { name: "HH", category: "HH" },
        { name: "II", category: "II" },
        { name: "JJ", category: "JJ" },
        { name: "KK", category: "KK" },
        { name: "LL", category: "LL" },
        { name: "MM", category: "MM" },
        { name: "NN", category: "NN" },
        { name: "OO", category: "OO" },
        { name: "PP", category: "PP" },
        { name: "QQ", category: "QQ" },
        { name: "RR", category: "RR" },
        { name: "SS", category: "SS" },
        { name: "TT", category: "TT" },
        { name: "UU", category: "UU" },
    ],
    links: [
        { source: "A", target: "B", value: 10 },
        { source: "A", target: "C", value: 10 },
        { source: "A", target: "F", value: 10 },
        { source: "A", target: "L", value: 10 },
        { source: "L", target: "M", value: 10 },
        { source: "M", target: "N", value: 10 },
        { source: "L", target: "O", value: 10 },
        { source: "O", target: "P", value: 10 },
        { source: "A", target: "Q", value: 10 },
        { source: "Q", target: "R", value: 10 },
        { source: "R", target: "S", value: 10 },
        { source: "F", target: "G", value: 10 },
        { source: "G", target: "H", value: 10 },
        { source: "A", target: "I", value: 10 },
        { source: "I", target: "J", value: 10 },
        { source: "J", target: "K", value: 10 },
        { source: "C", target: "D", value: 10 },
        { source: "D", target: "E", value: 10 },
        { source: "E", target: "T", value: 10 },
        { source: "B", target: "T", value: 10 },
        { source: "T", target: "U", value: 10 },
        { source: "U", target: "V", value: 10 },
        { source: "U", target: "W", value: 10 },
        { source: "U", target: "X", value: 10 },
        { source: "U", target: "Y", value: 10 },
        { source: "U", target: "Z", value: 10 },
        { source: "U", target: "AA", value: 10 },
        { source: "U", target: "BB", value: 10 },
        { source: "U", target: "CC", value: 10 },
        { source: "U", target: "DD", value: 10 },
        { source: "U", target: "EE", value: 10 },
        { source: "U", target: "FF", value: 10 },
        { source: "U", target: "GG", value: 10 },
        { source: "U", target: "HH", value: 10 },
        { source: "U", target: "II", value: 10 },
        { source: "U", target: "JJ", value: 10 },
        { source: "T", target: "KK", value: 10 },
        { source: "KK", target: "LL", value: 10 },
        { source: "LL", target: "MM", value: 10 },
        { source: "LL", target: "NN", value: 10 },
        { source: "NN", target: "OO", value: 10 },
        { source: "OO", target: "PP", value: 10 },
        { source: "LL", target: "QQ", value: 10 },
        { source: "LL", target: "RR", value: 10 },
        { source: "T", target: "SS", value: 10 },
        { source: "T", target: "TT", value: 10 },
        { source: "T", target: "UU", value: 10 },
    ],
};

const MARGIN_Y = 25;
const MARGIN_X = 5;
const width = 1350;
const height = 800;
const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253", "#2ef6db", "#2ef65d"];

export default function Home() {
    const allGroups = Array.from(new Set(data.nodes.map((d) => d.category))).sort();
    const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

    const sankeyGenerator = sankey()
        .nodeWidth(20)
        .nodePadding(10)
        .extent([
            [MARGIN_X, MARGIN_Y],
            [width - MARGIN_X, height - MARGIN_Y],
        ])
        .nodeId((node: any) => node?.name)
        .nodeAlign(sankeyCenter)
        .nodeSort(null as any);

    const { nodes, links } = sankeyGenerator(data as SankeyGraph<{}, {}>);

    const allNodes = nodes.map((node: any) => {
        return (
            <g key={node.index}>
                <rect
                    height={node.y1 - node.y0}
                    width={sankeyGenerator.nodeWidth()}
                    x={node.x0}
                    y={node.y0}
                    stroke={"black"}
                    fill={colorScale(node.category)}
                    fillOpacity={1}
                    rx={1}
                />
            </g>
        );
    });

    const allLinks = links.map((link: any, i) => {
        const linkGenerator = sankeyLinkHorizontal();
        const path = linkGenerator(link);

        return (
            <path
                key={i}
                d={path as string}
                stroke={colorScale(link.source.category)}
                fill="none"
                strokeOpacity={0.3}
                strokeWidth={link.width / 7}
            />
        );
    });

    const allLabels = nodes.map((node: any, i) => {
        return (
            <text
                key={i}
                x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
                y={(node.y1 + node.y0) / 2}
                dy="0.35rem"
                textAnchor={node.x0 < width / 2 ? "start" : "end"}
                fontSize={9}
                fontWeight={600}>
                {node.name}
            </text>
        );
    });

    return (
        <div style={{ padding: 20 }}>
            <svg width={width} height={height}>
                {allLinks}
                {allNodes}
                {allLabels}
            </svg>
        </div>
    );
}
