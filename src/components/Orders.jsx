import React, { useEffect } from 'react';
import styled from 'styled-components';
// import apple from "../assets/apple.png";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMetrics } from '../redux/actions';

function Orders() {
    // const [metrics, setMetrics] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();

    const metrics = useSelector(state => state.metrics.paginatedMetrics);
    // console.log('Metrics', metrics);
    const totalPages = useSelector(state => state.metrics.totalPages);
    const currentPage = useSelector(state => state.metrics.currentPage);
    const error = useSelector(state => state.metrics.error);
    // const { metrics, totalPages, currentPage, error } = useSelector(state => state.metrics);
    console.log("Original State:", { metrics, currentPage, totalPages, error });
    useEffect(() => {
        dispatch(fetchMetrics(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        console.log('Current Page Updated:', currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        dispatch(fetchMetrics(page));
    };

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            dispatch(fetchMetrics(nextPage));
        }
    };

    const handlePreviousPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            dispatch(fetchMetrics(prevPage));
        }
    };

    return (
        <Section>
            <div className="orders">
                <div className="orders__details">
                    <h4>Recent Cloud Performance</h4>
                    <div>
                        <button onClick={handlePreviousPage} disabled={currentPage <= 1}>Previous</button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={number === currentPage ? 'active' : ''}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
                    </div>
                </div>
                <div>
                    <h5>Latest Records fetched: 50</h5>
                </div>
                <div className="orders__table">
                    {error && <p className="error">Error: {error}</p>}
                    <table>
                        <thead>
                            <tr>
                                <th>Time Stamp</th>
                                <th>CPU Utilization</th>
                                <th>Memory Utilization</th>
                                <th>Network In</th>
                                <th>Network Out</th>
                                <th>Latency</th>
                                <th>Error Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics && metrics.length > 0 ? (
                                metrics.map(metric => (
                                    <tr key={metric._id}>
                                        <td>{new Date(metric.timeStamp).toLocaleString()}</td>
                                        <td>{metric.cpuUtilization}%</td>
                                        <td>{metric.memoryUtilization}%</td>
                                        <td>{metric.networkIn} bytes</td>
                                        <td>{metric.networkOut} bytes</td>
                                        <td>{metric.latency} ms</td>
                                        <td>{metric.errorRate}%</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No data available</td>
                                </tr>
                            )}
                        </tbody>
                        {/* <tr>
                            <td>#9876543</td>
                            <td className="img"> <img src={apple} alt="" /><span>Apple Watch</span></td>
                            <td>Jul 29, 2021</td>
                            <td>$329</td>
                            <td ><button>Complete</button></td>
                        </tr> */}
                    </table>
                </div>
            </div>
        </Section>
    );
}

export default Orders
const Section = styled.section`
.orders {
    color: black;
    width: 100%;
    .orders__details {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0 ;
        div {
            display: flex;
            gap: 1rem;
            button {
                padding: 0.4rem 1rem;
                border: none;
                cursor: pointer;
                background-color: white;
                color: #668DFF;
                font-weight: bold;

                &:hover {
                    background-color: #668DFF;  // Change background color on hover
                    color: white;               // Change text color on hover
                }
            }
        }
        .active{  
                    color: white;
                    background-color: #668DFF;
        }
    }
    .orders__table {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        table {
            border-collapse: collapse;
            width: 100%;
            th, td {
                text-align: center;
                padding: 5px;
                justify-content: space-evenly;
                button {
border-radius: 0.3rem;
padding: 0.4rem 1rem;
border: none;
cursor: pointer;
background-color: #EEF4FF;
color: blue;
font-weight: bold;
                }
                img {
                    height: 2rem;
                    width: 2rem;
                }
                span {
                    margin-top: 0.2 rem;
                }
            }
            .img {
                display: flex;
                justify-content: center;
            }
        }
    }
}
`;