import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js';

export const LineChart = props => {
    const chartRef = useRef(null);
    const [chart, setChart] = useState(0);
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
                    },
                ],
            },
        });
    }, []);
    return <canvas ref={chartRef}> </canvas>;
};
