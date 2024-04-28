import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../../redux/actions';

//Capitalize the component name
function MemoryVisulization() {
    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics.allMetrics);
    const error = useSelector(state => state.metrics.error);
    console.log('All data:', metrics);

    useEffect(() => {
        dispatch(fetchMetrics(undefined, true))
    }, [dispatch]);

    const extractMetrics = metrics.map(metric => ({
        timeStamp: metric.timeStamp,
        memoryUtilization: metric.memoryUtilization
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={extractMetrics}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeStamp" tickFormatter={(timeStr) => new Date(timeStr).toLocaleTimeString()} />
                <YAxis label={{ value: 'Memory %', angle: -90, position: 'insideLeft' }} />
                <Tooltip labelFormatter={(timeStr) => new Date(timeStr).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="memoryUtilization" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
    //     <div>
    //         {error && <p>Error: {error}</p>}
    //         {metrics && metrics.map(metric => (
    //             <div key={metric._id}>
    //                 <li>{metric.cpuUtilization}</li>
    //             </div>
    //         ))}
    //     </div>
    // )
};

export default MemoryVisulization;