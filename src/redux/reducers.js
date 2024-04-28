import { FETCH_METRICS_SUCCESS, FETCH_METRICS_FAILURE, FETCH_ALL_METRICS_SUCCESS } from "./actions";
import { combineReducers } from 'redux';

const initialState = {
    allMetrics: [],
    paginatedMetrics: [],
    error: null,
    totalPages: 0,
    currentPage: 1
};

const metricsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_METRICS_SUCCESS:
            console.log('State after actionAll:', state);
            return {
                ...state,
                allMetrics: action.payload,
            }
        case FETCH_METRICS_SUCCESS:
            console.log('State after action:', state);
            return {
                ...state,
                paginatedMetrics: action.payload.metrics,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            };

        case FETCH_METRICS_FAILURE:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    metrics: metricsReducer,
});