import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../../redux/actions';
import styled from "styled-components";
import { AiOutlineCaretDown } from "react-icons/ai";

//Capitalize the component name
function CpuVisulization() {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => setOpen(!open);

    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics.allMetrics);
    const error = useSelector(state => state.metrics.error);
    console.log('All data:', metrics);

    useEffect(() => {
        dispatch(fetchMetrics(undefined, true))
    }, [dispatch]);

    const extractMetrics = metrics.map(metric => ({
        timeStamp: metric.timeStamp,
        cpuUtilization: metric.cpuUtilization,
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
                <YAxis label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
                <Tooltip labelFormatter={(timeStr) => new Date(timeStr).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="cpuUtilization" name="CPU Utilization" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line
                    type="monotone"
                    dataKey="memoryUtilization"
                    name="Memory Utilization"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
        // <Section>
        //     <div className="sales">
        //         <div className="sales__details">
        //             <div>
        //                 <h4>Sales Overview</h4>
        //             </div>
        //             <div>
        //                 <button onClick={toggleDropdown}>
        //                     Monthly
        //                     <AiOutlineCaretDown />
        //                 </button>
        //                 {open && (
        //                     <div className="dropdown-menu">
        //                         <ul>
        //                             <li>Monthly</li>
        //                             <li>Quarterly</li>
        //                             <li>Yearly</li>
        //                         </ul>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>
        //         <div className="sales__graph">

        //         </div>
        //     </div>
        // </Section>
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

export default CpuVisulization;
const Section = styled.section`
  .sales {
    color: black;
    width: 100%;
    .sales__details {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      div {
        display: flex;
        gap: 1rem;
        button {
          border-radius: 0.5rem;
          padding: 0.4rem 1rem;
          border: none;
          cursor: pointer;
          background-color: #EEF4FF;
            color: black;
            svg {
                font-size: 0.6rem;
            }
        }
      }
    }
    .sales__graph {
      height: 10rem;
      width: 100%;
      .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
      color : white !important;
    }
    }
  }
  `;