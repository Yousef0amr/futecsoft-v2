import React, { useEffect } from 'react'
import { AgCharts } from "ag-charts-react";
import { useState } from 'react';
const PieChart = ({ data, name }) => {

    const [options, setOptions] = useState({
        data: [],
        background: {
            fill: "transparent",
        },
        theme: 'ag-vivid',
        series: [
            {
                type: "pie",
                angleKey: "amount",
                calloutLabelKey: "asset",
                sectorLabelKey: "amount",

                sectorLabel: {
                    color: "white",
                    fontWeight: "bold",
                    formatter: ({ value }) => `$${(value / 1000).toFixed(0)}K`,
                },
            },
        ],
    });

    useEffect(() => {
        setOptions({
            data: data,
            title: {
                text: name,
                fontSize: 18,
            },
            background: {
                fill: 'transparent',
            },
            theme: 'ag-vivid',
            series: [
                {
                    type: "pie",
                    angleKey: "amount",
                    calloutLabelKey: "asset",
                    sectorLabelKey: "amount",
                    sectorLabel: {
                        color: "white",
                        fontWeight: "bold",
                        formatter: ({ value }) => `${(value)}`,
                    },
                },
            ],
        });
    }, [data, name]);

    return <AgCharts style={{ border: "1px solid var(--border-color-1)", marginTop: '20px', direction: "ltr", minHeight: "400px" }} options={options} />;
}

export default PieChart
