import axios from "axios";
import {createApiAction, createApiReducer, METHODS, STATUSES} from "./apiHelper";
import {API_URL} from "../../utils/constants";
import {displayError} from "./errors";
import {getTokenConfig} from "./authHelper";


const ENTITY_NAME = "graph";

// REDUCER
const graphReducer = createApiReducer(ENTITY_NAME, "id");
export default graphReducer;

// OPERATIONS
export const fetchTime = (graph) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
//let access_token = localStorage.getItem("access_token");
    return (
        axios
            .get(`${API_URL}/result/graph/time?bins=${graph.number_of_bins}`, getTokenConfig(getState))
            .then((res) => {
                dispatch(
                    createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data)
                );
                // return res
            })
            .catch((err) => {
                displayError("Unable to get graph")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
            })

    );


};


export const fetchAccuracy = (graph) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
    //let access_token = localStorage.getItem("access_token");
    return (
        axios
            .get(`${API_URL}/result/graph/accuracy?bins=${graph.number_of_bins}`, getTokenConfig(getState))
            .then((res) => {
                dispatch(
                    createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data)
                );
                // return res
            })
            .catch((err) => {
                displayError("Unable to get graph")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
            })

    );


};


export const selectGraphLoading = state => state.graphReducer.isLoading[METHODS.RETRIEVE] === true;
export const selectGraphFailed = state => state.graphReducer.isLoading[METHODS.RETRIEVE] === false && state.graphReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectGraph = state => state.graphReducer.item;