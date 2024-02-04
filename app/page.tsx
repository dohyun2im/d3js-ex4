"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface Data {
    name: string;
    value?: number;
    children?: Data[];
}

interface Clip {
    clipUid: string;
}

interface Leaf {
    leafUid: string;
}

const data: Data = {
    name: "flare",
    children: [
        {
            name: "analytics",
            children: [
                {
                    name: "cluster",
                    children: [
                        { name: "AgglomerativeCluster", value: 3938 },
                        { name: "CommunityStructure", value: 3812 },
                    ],
                },
                {
                    name: "graph",
                    children: [
                        { name: "BetweennessCentrality", value: 3534 },
                        { name: "LinkDistance", value: 5731 },
                        { name: "MaxFlowMinCut", value: 7840 },
                    ],
                },
                { name: "optimization", children: [{ name: "AspectRatioBanker", value: 7074 }] },
            ],
        },
        {
            name: "animate",
            children: [
                { name: "Easing", value: 17010 },
                { name: "FunctionSequence", value: 5842 },
                {
                    name: "interpolate",
                    children: [
                        { name: "ArrayInterpolator", value: 1983 },
                        { name: "ColorInterpolator", value: 2047 },
                        { name: "DateInterpolator", value: 1375 },
                        { name: "Interpolator", value: 8746 },
                    ],
                },
                { name: "ISchedulable", value: 1041 },
                { name: "Parallel", value: 5176 },
                { name: "Pause", value: 449 },
                { name: "Scheduler", value: 5593 },
            ],
        },
        {
            name: "data",
            children: [
                {
                    name: "converters",
                    children: [
                        { name: "Converters", value: 721 },
                        { name: "DelimitedTextConverter", value: 4294 },
                        { name: "GraphMLConverter", value: 9800 },
                        { name: "IDataConverter", value: 1314 },
                        { name: "JSONConverter", value: 2220 },
                    ],
                },
                { name: "DataField", value: 1759 },
                { name: "DataSchema", value: 2165 },
                { name: "DataSet", value: 586 },
                { name: "DataSource", value: 3331 },
                { name: "DataTable", value: 772 },
                { name: "DataUtil", value: 3322 },
            ],
        },
        {
            name: "display",
            children: [
                { name: "DirtySprite", value: 8833 },
                { name: "LineSprite", value: 1732 },
                { name: "RectSprite", value: 3623 },
                { name: "TextSprite", value: 10066 },
            ],
        },
        { name: "flex", children: [{ name: "FlareVis", value: 4116 }] },
        {
            name: "physics",
            children: [
                { name: "DragForce", value: 1082 },
                { name: "GravityForce", value: 1336 },
                { name: "IForce", value: 319 },
                { name: "NBodyForce", value: 10498 },
                { name: "Particle", value: 2822 },
                { name: "Simulation", value: 9983 },
                { name: "Spring", value: 2213 },
                { name: "SpringForce", value: 1681 },
            ],
        },
        {
            name: "query",
            children: [
                { name: "DateUtil", value: 4141 },
                { name: "Distinct", value: 933 },
                { name: "Expression", value: 5130 },
                { name: "ExpressionIterator", value: 3617 },
                { name: "Fn", value: 3240 },
                { name: "If", value: 2732 },
                {
                    name: "methods",
                    children: [
                        { name: "distinct", value: 292 },
                        { name: "div", value: 595 },
                        { name: "eq", value: 594 },
                        { name: "fn", value: 460 },
                        { name: "gt", value: 603 },
                        { name: "gte", value: 625 },
                    ],
                },
                { name: "StringUtil", value: 4130 },
                { name: "Sum", value: 791 },
                { name: "Variable", value: 1124 },
                { name: "Variance", value: 1876 },
                { name: "Xor", value: 1101 },
            ],
        },
        {
            name: "scale",
            children: [
                { name: "QuantitativeScale", value: 4839 },
                { name: "RootScale", value: 1756 },
                { name: "Scale", value: 4268 },
                { name: "ScaleType", value: 1821 },
                { name: "TimeScale", value: 5833 },
            ],
        },
        {
            name: "util",
            children: [
                { name: "Displays", value: 12555 },
                { name: "Filter", value: 2324 },
                { name: "Geometry", value: 10993 },
                {
                    name: "heap",
                    children: [
                        { name: "FibonacciHeap", value: 9354 },
                        { name: "HeapNode", value: 1233 },
                    ],
                },
                { name: "IEvaluable", value: 335 },
                { name: "IPredicate", value: 383 },
                { name: "IValueProxy", value: 874 },
                {
                    name: "math",
                    children: [
                        { name: "DenseMatrix", value: 3165 },
                        { name: "IMatrix", value: 2815 },
                        { name: "SparseMatrix", value: 3366 },
                    ],
                },
                { name: "Maths", value: 17705 },
                { name: "Orientation", value: 1486 },
                {
                    name: "palette",
                    children: [
                        { name: "ColorPalette", value: 6367 },
                        { name: "Palette", value: 1229 },
                        { name: "ShapePalette", value: 2059 },
                        { name: "SizePalette", value: 2291 },
                    ],
                },
                { name: "Property", value: 5559 },
                { name: "Shapes", value: 19118 },
                { name: "Sort", value: 6887 },
                { name: "Stats", value: 6557 },
                { name: "Strings", value: 22026 },
            ],
        },
        {
            name: "vis",
            children: [
                {
                    name: "axis",
                    children: [
                        { name: "Axes", value: 1302 },
                        { name: "Axis", value: 24593 },
                    ],
                },
                {
                    name: "events",
                    children: [
                        { name: "DataEvent", value: 2313 },
                        { name: "SelectionEvent", value: 1880 },
                        { name: "TooltipEvent", value: 1701 },
                        { name: "VisualizationEvent", value: 1117 },
                    ],
                },
                {
                    name: "legend",
                    children: [
                        { name: "Legend", value: 20859 },
                        { name: "LegendItem", value: 4614 },
                        { name: "LegendRange", value: 10530 },
                    ],
                },
                {
                    name: "operator",
                    children: [
                        {
                            name: "distortion",
                            children: [
                                { name: "BifocalDistortion", value: 4461 },
                                { name: "Distortion", value: 6314 },
                                { name: "FisheyeDistortion", value: 3444 },
                            ],
                        },
                        {
                            name: "encoder",
                            children: [
                                { name: "ColorEncoder", value: 3179 },
                                { name: "Encoder", value: 4060 },
                                { name: "PropertyEncoder", value: 4138 },
                                { name: "ShapeEncoder", value: 1690 },
                                { name: "SizeEncoder", value: 1830 },
                            ],
                        },
                        {
                            name: "filter",
                            children: [
                                { name: "FisheyeTreeFilter", value: 5219 },
                                { name: "GraphDistanceFilter", value: 3165 },
                                { name: "VisibilityFilter", value: 3509 },
                            ],
                        },
                        { name: "IOperator", value: 1286 },
                        {
                            name: "label",
                            children: [
                                { name: "Labeler", value: 9956 },
                                { name: "RadialLabeler", value: 3899 },
                                { name: "StackedAreaLabeler", value: 3202 },
                            ],
                        },
                        {
                            name: "layout",
                            children: [
                                { name: "ForceDirectedLayout", value: 8411 },
                                { name: "IcicleTreeLayout", value: 4864 },
                                { name: "IndentedTreeLayout", value: 3174 },
                                { name: "Layout", value: 7881 },
                                { name: "NodeLinkTreeLayout", value: 12870 },
                            ],
                        },
                        { name: "Operator", value: 2490 },
                        { name: "OperatorList", value: 5248 },
                    ],
                },
                { name: "Visualization", value: 16540 },
            ],
        },
    ],
};

const width = 1454;
const height = 854;

const Page: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const color = d3.scaleOrdinal(
            (data?.children as Data[]).map((d) => d.name),
            d3.schemeTableau10
        );

        const root = d3.treemap().tile(d3.treemapSquarify).size([width, height]).padding(1).round(true)(
            (d3.hierarchy(data) as any)
                .sum((d: Data) => d.value)
                .sort((a: Data, b: Data) => (b?.value as number) - (a?.value as number))
        );

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

        const leaf = svg
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

        const format = d3.format(",d");

        leaf.append("title").text(
            (d) =>
                `${d
                    .ancestors()
                    .reverse()
                    .map((d) => (d.data as Data).name)
                    .join(".")}\n${format(d.value as number)}`
        );

        leaf.append("rect")
            .attr("id", (d: any) => (d.leafUid = d3.create("leaf")).attr("id") as string)
            .attr("fill", (d: any) => {
                while (d.depth > 1) d = d.parent;
                return color((d.data as Data).name);
            })
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0);

        leaf.append("clipPath")
            .attr("id", (d: any) => (d.clipUid = d3.create("clip")).attr("id") as string)
            .append("use")
            .attr("xlink:href", (d: any) => d.leafUid.href);

        leaf.append("text")
            .attr("clip-path", (d: any) => d.clipUid)
            .selectAll("tspan")
            .data((d) => (d.data as Data).name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value as number)))
            .join("tspan")
            .attr("x", 2)
            .attr("y", (d, i, nodes) => `${((i === nodes.length - 1) as any) * 0.3 + 1.1 + i * 0.9}em`)
            .attr("fill-opacity", (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
            .style("font-weight", "bold")
            .text((d) => d as string);
    }, [data]);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <svg ref={svgRef} />
        </div>
    );
};

export default Page;
