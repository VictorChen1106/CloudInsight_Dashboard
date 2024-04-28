import {
    ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis
} from 'recharts';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../../redux/actions';

function NetworkInLatencyChart() {
    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics.allMetrics);
    const error = useSelector(state => state.metrics.error);
    console.log('All data:', metrics);

    useEffect(() => {
        dispatch(fetchMetrics(undefined, true))
    }, [dispatch]);

    const extractMetrics = metrics.map(metric => ({
        networkIn: metric.networkIn,
        latency: metric.latency
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
                data={extractMetrics}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="networkIn" name="Network Input" unit="bytes" />
                <YAxis type="number" dataKey="latency" name="Latency" unit="ms" />
                <ZAxis range={[100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Network vs Latency" data={extractMetrics} fill="#8884d8" shape="circle" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default NetworkInLatencyChart;