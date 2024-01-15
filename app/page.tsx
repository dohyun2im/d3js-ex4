"use client";

import { scaleOrdinal } from "d3";
import { SankeyGraph, sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";

const data = {
    nodes: [
        {
            name: "농업 '폐기물'",
            category: "농업",
        },
        {
            name: "생물 변환",
            category: "생물 변환",
        },
        {
            name: "액체",
            category: "액체",
        },
        {
            name: "손실",
            category: "손실",
        },
        {
            name: "고체",
            category: "고체",
        },
        {
            name: "가스",
            category: "가스",
        },
        {
            name: "생물 연료 수입",
            category: "생물 연료",
        },
        {
            name: "바이오매스 수입",
            category: "바이오매스",
        },
        {
            name: "석탄 수입",
            category: "석탄",
        },
        {
            name: "석탄",
            category: "석탄",
        },
        {
            name: "석탄 저장",
            category: "석탄",
        },
        {
            name: "지역 난방",
            category: "지역",
        },
        {
            name: "산업",
            category: "산업",
        },
        {
            name: "난방 및 냉방 - 상업",
            category: "난방",
        },
        {
            name: "난방 및 냉방 - 가정",
            category: "난방",
        },
        {
            name: "전기 그리드",
            category: "전기",
        },
        {
            name: "초과 생산 / 수출",
            category: "초과",
        },
        {
            name: "수소 변환",
            category: "수소",
        },
        {
            name: "도로 운송",
            category: "도로",
        },
        {
            name: "농업",
            category: "농업",
        },
        {
            name: "철도 운송",
            category: "철도",
        },
        {
            name: "조명 및 가전제품 - 상업",
            category: "조명",
        },
        {
            name: "조명 및 가전제품 - 가정",
            category: "조명",
        },
        {
            name: "가스 수입",
            category: "가스",
        },
        {
            name: "천연 가스",
            category: "천연 가스",
        },
        {
            name: "가스 저장",
            category: "가스",
        },
        {
            name: "열 발전",
            category: "열",
        },
        {
            name: "지열",
            category: "지열",
        },
        {
            name: "수소",
            category: "수소",
        },
        {
            name: "수력",
            category: "수력",
        },
        {
            name: "국제 해운",
            category: "국제",
        },
        {
            name: "국내 항공",
            category: "국내",
        },
        {
            name: "국제 항공",
            category: "국제",
        },
        {
            name: "국내 항해",
            category: "국내",
        },
        {
            name: "해양 바이오매스",
            category: "해양",
        },
        {
            name: "원자력",
            category: "원자력",
        },
        {
            name: "유류 수입",
            category: "유류",
        },
        {
            name: "유류",
            category: "유류",
        },
        {
            name: "유류 저장",
            category: "유류",
        },
    ],
    links: [
        {
            source: "농업 '폐기물'",
            target: "생물 변환",
            value: 124.729,
        },
        {
            source: "생물 변환",
            target: "액체",
            value: 0.597,
        },
        {
            source: "생물 변환",
            target: "손실",
            value: 26.862,
        },
        {
            source: "생물 변환",
            target: "고체",
            value: 280.322,
        },
        {
            source: "생물 변환",
            target: "가스",
            value: 81.144,
        },
        {
            source: "생물 연료 수입",
            target: "액체",
            value: 35,
        },
        {
            source: "바이오매스 수입",
            target: "고체",
            value: 35,
        },
        {
            source: "석탄 수입",
            target: "석탄",
            value: 11.606,
        },
        {
            source: "석탄 저장",
            target: "석탄",
            value: 63.965,
        },
        {
            source: "석탄",
            target: "고체",
            value: 75.571,
        },
        {
            source: "지역 난방",
            target: "산업",
            value: 10.639,
        },
        {
            source: "지역 난방",
            target: "난방 및 냉방 - 상업",
            value: 22.505,
        },
        {
            source: "지역 난방",
            target: "난방 및 냉방 - 가정",
            value: 46.184,
        },
        {
            source: "전기 그리드",
            target: "초과 생산 / 수출",
            value: 104.453,
        },
        {
            source: "전기 그리드",
            target: "난방 및 냉방 - 가정",
            value: 113.726,
        },
        {
            source: "전기 그리드",
            target: "수소 변환",
            value: 27.14,
        },
        {
            source: "전기 그리드",
            target: "산업",
            value: 342.165,
        },
        {
            source: "전기 그리드",
            target: "도로 운송",
            value: 37.797,
        },
        {
            source: "전기 그리드",
            target: "농업",
            value: 4.412,
        },
        {
            source: "전기 그리드",
            target: "난방 및 냉방 - 상업",
            value: 40.858,
        },
        {
            source: "전기 그리드",
            target: "손실",
            value: 56.691,
        },
        {
            source: "전기 그리드",
            target: "철도 운송",
            value: 7.863,
        },
        {
            source: "전기 그리드",
            target: "조명 및 가전제품 - 상업",
            value: 90.008,
        },
        {
            source: "전기 그리드",
            target: "조명 및 가전제품 - 가정",
            value: 93.494,
        },
        {
            source: "가스 수입",
            target: "천연 가스",
            value: 40.719,
        },
        {
            source: "가스 저장",
            target: "천연 가스",
            value: 82.233,
        },
        {
            source: "가스",
            target: "난방 및 냉방 - 상업",
            value: 0.129,
        },
        {
            source: "가스",
            target: "손실",
            value: 1.401,
        },
        {
            source: "가스",
            target: "열 발전",
            value: 151.891,
        },
        {
            source: "가스",
            target: "농업",
            value: 2.096,
        },
        {
            source: "가스",
            target: "산업",
            value: 48.58,
        },
        {
            source: "지열",
            target: "전기 그리드",
            value: 7.013,
        },
        {
            source: "수소 변환",
            target: "수소",
            value: 20.897,
        },
        {
            source: "수소 변환",
            target: "손실",
            value: 6.242,
        },
        {
            source: "수소",
            target: "도로 운송",
            value: 20.897,
        },
        {
            source: "수력",
            target: "전기 그리드",
            value: 6.995,
        },
        {
            source: "액체",
            target: "산업",
            value: 121.066,
        },
        {
            source: "액체",
            target: "국제 해운",
            value: 128.69,
        },
        {
            source: "액체",
            target: "도로 운송",
            value: 135.835,
        },
        {
            source: "액체",
            target: "국내 항공",
            value: 14.458,
        },
        {
            source: "액체",
            target: "국제 항공",
            value: 206.267,
        },
        {
            source: "액체",
            target: "농업",
            value: 3.64,
        },
        {
            source: "액체",
            target: "국내 항해",
            value: 33.218,
        },
        {
            source: "액체",
            target: "철도 운송",
            value: 4.413,
        },
        {
            source: "해양 바이오매스",
            target: "생물 변환",
            value: 4.375,
        },
        {
            source: "천연 가스",
            target: "가스",
            value: 122.952,
        },
        {
            source: "원자력",
            target: "열 발전",
            value: 839.978,
        },
        {
            source: "유류 수입",
            target: "유류",
            value: 504.287,
        },
        {
            source: "유류 저장",
            target: "유류",
            value: 107.703,
        },
        {
            source: "유류",
            target: "액체",
            value: 611.99,
        },
    ],
};

const MARGIN_Y = 25;
const MARGIN_X = 5;
const width = 800;
const height = 600;
const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];

export default function Home() {
    const allGroups = Array.from(new Set(data.nodes.map((d) => d.category))).sort();
    const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

    const sankeyGenerator = sankey()
        .nodeWidth(26)
        .nodePadding(10)
        .extent([
            [MARGIN_X, MARGIN_Y],
            [width - MARGIN_X, height - MARGIN_Y],
        ])
        .nodeId((node: any) => node?.name)
        .nodeAlign(sankeyJustify);

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
                    rx={0.9}
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
                strokeWidth={link.width}
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
                fontSize={12}>
                {node.name}
            </text>
        );
    });

    return (
        <div style={{ border: "2px dashed #000", borderRadius: 4, margin: 20, padding: 20, width: 800 }}>
            <svg width={width} height={height}>
                {allLinks}
                {allNodes}
                {allLabels}
            </svg>
        </div>
    );
}
