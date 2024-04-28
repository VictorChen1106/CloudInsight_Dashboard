import axios from 'axios';

//action types
export const FETCH_METRICS_SUCCESS = 'FETCH_METRICS_SUCCESS';
export const FETCH_METRICS_FAILURE = 'FETCH_METRICS_FAILURE';
export const FETCH_ALL_METRICS_SUCCESS = 'FETCH_ALL_METRICS_SUCCESS';

//action creators
export const fetchMetricsSuccess = (metrics, totalPages, currentPage) => ({
    type: FETCH_METRICS_SUCCESS,
    payload: {
        metrics,
        totalPages,
        currentPage
    }
});

export const fetchAllMetricsSuccess = (metrics) => ({
    type: FETCH_ALL_METRICS_SUCCESS,
    payload: metrics,
});

export const fetchMetricsFailure = error => ({
    type: FETCH_METRICS_FAILURE,
    payload: error,
})

export const fetchMetrics = (page = 1, fetchAll = false) => async dispatch => {
    try {
        const url = fetchAll
            ? `http://localhost:3000/api/metrics?all=true`
            : `http://localhost:3000/api/metrics?page=${page}`;
        const response = await axios.get(url);
        console.log('API data fetched:', response.data);

        if (fetchAll) {
            const metrics = response.data.metrics;
            console.log('fetchAll:', metrics);
            dispatch(fetchAllMetricsSuccess(metrics));
        } else {
            const metrics = response.data.metrics;
            const totalPages = response.data.totalPages;
            const currentPage = response.data.currentPage;
            console.log('response.data', { metrics, totalPages, currentPage });
            dispatch(fetchMetricsSuccess(metrics, totalPages, currentPage));
        }
        // const metrics = response.data.metrics;
        // const totalPages = response.data.totalPages;
        // const currentPage = response.data.currentPage;

        // console.log('Fetched data:', response.data);
        // dispatch(fetchMetricsSuccess(metrics));

    } catch (error) {
        console.error('Error fetching metrics', error);
        dispatch(fetchMetricsFailure(error.toString()));
    }

};