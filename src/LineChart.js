import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

export const LineChart = props => {
    const chartRef = useRef(null);
    useEffect(() => {
        new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: props.data.map(d => d.time),
                datasets: [
                    {
                        label: 'Market Value',
                        data: props.data.map(d => d.value),
                        backgroundColor: props.color,
                        tension: 0,
                    },
                ],
            },
            options: {
                elements: {
                    line: {
                        borderColor: props.lineColor,
                    },
                },
            },
        });
    }, [props]);
    return <canvas ref={chartRef}> </canvas>;
};
