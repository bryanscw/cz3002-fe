import axios from 'axios';
import { createApiAction, createApiReducer, METHODS, STATUSES } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'accuracy_graph';

// REDUCER
const accGraphReducer = createApiReducer(ENTITY_NAME);
export default accGraphReducer;

// OPERATIONS
export const fetchAccuracyGraph = (bins, nodeNum) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  axios
    .get(
      `${API_URL}/result/graph/accuracy?bins=${bins}&nodeNum=${nodeNum}`,
      getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
          res.data),
      );
    })
    .catch((err) => {
      let message = err.response.data.status + ': ' + err.response.data.message;
      displayError(message)(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
    });
};

export const selectAccGraphLoading = state => state.accGraphReducer.isLoading[METHODS.RETRIEVE]
  === true;
export const selectAccGraphFailed = state => state.accGraphReducer.isLoading[METHODS.RETRIEVE]
  === false && state.accGraphReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectAccGraph = state => state.accGraphReducer.item;