import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../../redux/actions';

function DiskOperationChart() {
    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics.allMetrics);
    const error = useSelector(state => state.metrics.error);
    console.log('All data:', metrics);

    useEffect(() => {
        dispatch(fetchMetrics(undefined, true))
    }, [dispatch]);

    const extractMetrics = metrics.map(metric => ({
        timeStamp: metric.timeStamp,
        diskReadOps: metric.diskReadOps,
        diskWriteOps: metric.diskWriteOps
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={extractMetrics}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWrite" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="timeStamp" tickFormatter={(timeStr) => new Date(timeStr).toLocaleTimeString()} />
                <YAxis label={{ value: 'Operations', angle: -90, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="diskReadOps" stackId="1" stroke="#8884d8" fillOpacity={1} fill="url(#colorRead)" />
                <Area type="monotone" dataKey="diskWriteOps" stackId="1" stroke="#82ca9d" fillOpacity={1} fill="url(#colorWrite)" />
            </AreaChart>
        </ResponsiveContainer>

    );
};

export default DiskOperationChart;