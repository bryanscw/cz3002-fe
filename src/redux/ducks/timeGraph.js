import axios from 'axios';
import { createApiAction, createApiReducer, METHODS, STATUSES } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'time_graph';

// REDUCER
const timeGraphReducer = createApiReducer(ENTITY_NAME);
export default timeGraphReducer;

// OPERATIONS
export const fetchTimeGraph = (bins, nodeNum) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  axios
    .get(
      `${API_URL}/result/graph/time?bins=${bins}&nodeNum=${nodeNum}`,
      getTokenConfig(getState))
    .then((res) => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
    })
    .catch((err) => {
      let message = err.response.data.status + ': ' + err.response.data.message;
      displayError(message)(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
    });
};

export const selectTimeGraphLoading = state => state.timeGraphReducer.isLoading[METHODS.RETRIEVE]
  === true;
export const selectTimeGraphFailed = state => state.timeGraphReducer.isLoading[METHODS.RETRIEVE]
  === false && state.timeGraphReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectTimeGraph = state => state.timeGraphReducer.item;