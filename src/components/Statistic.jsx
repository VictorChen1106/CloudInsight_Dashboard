import styled from 'styled-components'
import { AiFillTag } from "react-icons/ai";
import { AiFillExperiment } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../redux/actions';

function Statistic() {
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
        networkOut: metric.networkOut,
        errorRate: metric.errorRate,
        latency: metric.latency
    }));

    // Calculate the total errorRate
    const totalErrorRate = extractMetrics.reduce((acc, metric) => acc + metric.errorRate, 0);
    const totalLatency = extractMetrics.reduce((acc, metric) => acc + metric.latency, 0);
    // Calculate the average errorRate
    const averageErrorRate = totalErrorRate / extractMetrics.length;
    const averageLatency = totalLatency / extractMetrics.length;

    // Calculate the total errorRate
    const totalNetworkIn = extractMetrics.reduce((acc, metric) => acc + metric.networkIn, 0);
    const totalNetworkOut = extractMetrics.reduce((acc, metric) => acc + metric.networkOut, 0);
    // Calculate the average errorRate
    const averageNetworkIn = totalNetworkIn / extractMetrics.length;
    const averageNetworkOut = totalNetworkOut / extractMetrics.length;

    return (
        <Section>
            <div className="analytic color1">
                <div className="design">
                    <div className="logo">
                        <AiFillTag />
                    </div>
                    <div className="content">
                        <h5>Error Rate</h5>
                    </div>
                </div>
                <div className="total">
                    <h6>Average Error Rate</h6>
                    <span className="t1">{averageErrorRate}%</span>
                    {/* <AiOutlineArrowUp className="svg1" /> */}
                </div>
            </div>
            <div className="analytic color2">
                <div className="design">
                    <div className="logo">
                        <AiFillExperiment />
                    </div>
                    <div className="content">
                        <h5>Network Latency</h5>
                    </div>
                </div>
                <div className="total">
                    <h6>Average Latency</h6>
                    <span className="t2">{averageLatency} ms</span>
                    {/* <AiOutlineArrowDown className="svg2" /> */}
                </div>
            </div>
            <div className="analytic color3">
                <div className="design">
                    <div className="logo">
                        <AiFillDollarCircle />
                    </div>
                    <div className="content">
                        <h5>Network In/Network Out</h5>
                    </div>
                </div>
                <div className="total">
                    <h6>Average Network In</h6>
                    <span className="t1">{averageNetworkIn} bytes</span>
                    <h6>Average Network Out</h6>
                    <span className="t1">{averageNetworkOut} bytes</span>

                    {/* <AiOutlineArrowUp className="svg1" /> */}
                </div>
            </div>
        </Section>
    )
}

export default Statistic
const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    .color1 {
        background-color: #EEF4FF;
    }
    .color2{
        background-color: #FDF4F5;
    }
    .color3{
        background-color: #FFFCE4;
    }
    .analytic {
        padding: 1rem 2rem 1rem 2rem;
        border-radius: 1rem;
        color: black;
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #D4E0FF;
            color: black;
            svg {
                color: black;
            }
        }
        .design{
            display: flex;
            align-items: center;
            gap: 1rem;
            .logo {
                background-color: white;
                border-radius: 1rem;
                border: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1.5rem;
                svg {
                    font-size: 1.5rem;
                }
            }
        }
        .total {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: space-evenly;
            margin-top: 20px;
            .svg1 {
                color: green;
            }
            .svg2 {
                color: red;
            }
            .t1 {
                color: green;
            }
            .t2{
                color: red;
            }
            h6{
                color: grey;
            }
        }
    }
`;
