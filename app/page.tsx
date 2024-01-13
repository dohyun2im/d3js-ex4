"use client";

import { HomeOutlined } from "@mui/icons-material";
import { Box, Divider, SwipeableDrawer, Tooltip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

const data = {
    name: "Tenant",
    children: [
        {
            name: "Node 1",
            children: [
                { name: "Node 1-1" },
                { name: "Node 1-2" },
                {
                    name: "Node 1-3",
                    children: [
                        { name: "Node 1-3-1" },
                        { name: "Node 1-3-2" },
                        {
                            name: "Node 1-3-3",
                            children: [
                                { name: "Node 1-3-3-1" },
                                { name: "Node 1-3-3-2" },
                                {
                                    name: "Node 1-3-3-3",
                                    children: [
                                        { name: "Node 1-3-3-3-1" },
                                        { name: "Node 1-3-3-3-2" },
                                        {
                                            name: "Node 1-3-3-3-3",
                                            children: [{ name: "Node 1-3-3-3-3-1" }, { name: "Node 1-3-3-3-3-2" }],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "Node 2",
            children: [
                { name: "Node 2-1" },
                { name: "Node 2-2" },
                {
                    name: "Node 2-3",
                    children: [
                        { name: "Node 2-3-1" },
                        { name: "Node 2-3-2" },
                        {
                            name: "Node 2-3-3",
                            children: [
                                { name: "Node 2-3-3-1" },
                                { name: "Node 2-3-3-2" },
                                {
                                    name: "Node 2-3-3-3",
                                    children: [
                                        { name: "Node 2-3-3-3-1" },
                                        { name: "Node 2-3-3-3-2" },
                                        {
                                            name: "Node 2-3-3-3-3",
                                            children: [{ name: "Node 2-3-3-3-3-1" }, { name: "Node 2-3-3-3-3-2" }],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "Node 3",
            children: [{ name: "Node 3-1" }],
        },
        {
            name: "Node 4",
        },
        {
            name: "Node 5",
        },
        {
            name: "Node 6",
        },
        {
            name: "Node 7",
        },
        {
            name: "Node 8",
        },
        {
            name: "Node 9",
        },
    ],
};

export default function Home() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const width = 1350;

        const root = d3.hierarchy(data);
        const dx = 50;
        const dy = width / (root.height + 1);

        const tree = d3.tree().nodeSize([dx, dy]);
        root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
        tree(root as any);

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d: any) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const height = x1 - x0 + dx * 2;

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-dy / 3, x0 - dx, width, height])
            .attr("style", "min-width: 1400px; max-width: 100%; height: auto; font: 10px sans-serif;");

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(root.links())
            .join("path")
            .attr(
                "d",
                (d3 as any)
                    .linkHorizontal()
                    .x((d: any) => d.y)
                    .y((d: any) => d.x)
            );

        const node = svg
            .append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll()
            .data(root.descendants())
            .join("g")
            .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

        const iconHtml = ReactDOMServer.renderToString(<HomeOutlined />);

        node.append("rect")
            .filter((d: any) => d.data.name !== "Tenant")
            .attr("width", 100)
            .attr("height", 30)
            .attr("x", 0)
            .attr("y", -15)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("fill", "white")
            .style("stroke", "#555")
            .style("stroke-width", 1.5)
            .style("z-index", 10)
            .on("mouseover", function (e) {
                setTooltipOpen(true);
                setTitle(e.target.__data__.data.name);
                d3.select(this).style("stroke", green[500]).style("stroke-width", 3);
            })
            .on("mouseout", function () {
                setTooltipOpen(false);
                d3.select(this).style("stroke", "#555").style("stroke-width", 1.5);
            })
            .on("click", function (e) {
                setDrawerOpen(true);
                console.log("Node clicked:", e.target.__data__.data);
            });

        node.append("foreignObject")
            .filter((d: any) => d.data.name !== "Tenant")
            .attr("width", 18)
            .attr("height", 18)
            .attr("x", -5)
            .attr("y", -25)
            .style("z-index", 10)
            .style("background", "#fff")
            .style("border-radius", "20px")
            .html(iconHtml);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", 7)
            .attr("text-anchor", "center")
            .text((d) => (d.data.name?.length > 13 ? `${d.data.name.substring(0, 13)}...` : d.data.name))
            .style("font-size", "12px")
            .on("mouseover", function (e) {
                setTooltipOpen(true);
                setTitle(e.target.__data__.data.name);
                d3.select(this?.parentElement?.childNodes[1] as Element)
                    .style("stroke", green[500])
                    .style("stroke-width", 2.5);
            })
            .on("mouseout", function () {
                setTooltipOpen(false);
                d3.select(this?.parentElement?.childNodes[1] as Element)
                    .style("stroke", "#555")
                    .style("stroke-width", 1.5);
            })
            .on("click", function (e) {
                setDrawerOpen(true);
                console.log("Node clicked:", e.target.__data__.data);
            })
            .clone(true)
            .lower()
            .attr("stroke", "white");
    }, [data]);

    return (
        <>
            <Tooltip open={tooltipOpen} title={title} placement="top" arrow followCursor>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <svg ref={svgRef} />
                </Box>
            </Tooltip>
            <SwipeableDrawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}>
                <Box minWidth={350} height="100%" role="presentation" onClick={() => setDrawerOpen(false)}>
                    <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
                        {title}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Box>
            </SwipeableDrawer>
        </>
    );
}
