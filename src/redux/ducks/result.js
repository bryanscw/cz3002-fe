import axios from 'axios';

import {
  createApiAction,
  createApiReducer,
  METHODS,
  STATUSES
} from './apiHelper';
import {API_URL} from '../../utils/constants';
import {displayError} from './errors';
import {getTokenConfig} from './authHelper';

const ENTITY_NAME = 'results';

// REDUCER
const resultsReducer = createApiReducer(ENTITY_NAME, "id");
export default resultsReducer;

// OPERATIONS
export const createResult = result => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

  return (
      axios
      .post(
          `${API_URL}/result/create`,
          result,
          getTokenConfig(getState)
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE,
            res.data));
      })
      .catch(err => {
        displayError("Unable to create result")(dispatch);
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
      })
  );
};

export const deleteResult = result => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

  return (
      axios
      .delete(
          `${API_URL}/result/${result.id}`,
          getTokenConfig(getState),
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE,
            result.id));
      })
      .catch(err => {
        displayError("Unable to delete result")(dispatch);
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
      })
  );
};

export const listAllResults = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

  return (
      axios
      .get(
          `${API_URL}/result/`,
          getTokenConfig(getState)
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST,
            res.data));
      })
      .catch(err => {
        displayError("Unable to list all results")(dispatch);
        dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
      })
  );
};

export const listUserResults = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

  return (
      axios
      .post(
          `${API_URL}/result/me/`,
          {},
          getTokenConfig(getState)
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST,
            res.data));
      })
      .catch(err => {
        displayError("Unable to list all user results")(dispatch);
        dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
      })
  );
};

export const getLatestResult = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

  return (
      axios
      .post(
          `${API_URL}/result/latest/`,
          getTokenConfig(getState)
      )
      .then(res => {
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
                res.data));
      })
      .catch(err => {
        displayError("Unable to get latest user result")(dispatch);
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
      })
  );
};

// SELECTORS
export const selectResultsLoading = state => state.resultsReducer.isLoading[METHODS.LIST]
    === true;
export const selectResultsFailed = state => state.resultsReducer.isLoading[METHODS.LIST]
    === false && state.resultsReducer.hasFailed[METHODS.LIST] === true;
export const selectResults = state => state.resultsReducer.items;