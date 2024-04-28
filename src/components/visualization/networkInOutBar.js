import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../../redux/actions';

function NetworkTrafficBarChart() {
    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics.allMetrics);
    const error = useSelector(state => state.metrics.error);
    console.log('All data:', metrics);

    useEffect(() => {
        dispatch(fetchMetrics(undefined, true))
    }, [dispatch]);

    const extractMetrics = metrics.map(metric => ({
        timeStamp: metric.timeStamp,
        networkIn: metric.networkIn,
        networkOut: metric.networkOut
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={extractMetrics}
                margin={{
                    top: 20, right: 30, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeStamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="networkIn" fill="#8884d8" name="Network In" />
                <Bar dataKey="networkOut" fill="#82ca9d" name="Network Out" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default NetworkTrafficBarChart;
