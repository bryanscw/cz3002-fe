import axios from 'axios';
import { createApiAction, createApiReducer, METHODS, STATUSES } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'result';

// REDUCER
const graphReducer = createApiReducer(ENTITY_NAME);
export default graphReducer;

// OPERATIONS
export const fetchTime = (bins, nodeNum) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  return (
    axios
      .get(
        `${API_URL}/result/graph/time?bins=${bins}&nodeNum=${nodeNum}`,
        getTokenConfig(getState))
      .then((res) => {
        dispatch(
          createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
            res.data),
        );
      })
      .catch((err) => {
        displayError('Unable to get time graph data')(dispatch);
        dispatch(
          createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
      })
  );
};

export const fetchAccuracy = (bins, nodeNum) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  return (
    axios
      .get(
        `${API_URL}/result/graph/accuracy?bins=${bins}&nodeNum=${nodeNum}`,
        getTokenConfig(getState))
      .then((res) => {
        dispatch(
          createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
            res.data),
        );
        // return res
      })
      .catch((err) => {
        displayError('Unable to get accuracy graph data')(dispatch);
        dispatch(
          createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
      })
  );
};

export const selectGraphLoading = state => state.graphReducer.isLoading[METHODS.RETRIEVE]
  === true;
export const selectGraphFailed = state => state.graphReducer.isLoading[METHODS.RETRIEVE]
  === false && state.graphReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectGraph = state => state.graphReducer.item;