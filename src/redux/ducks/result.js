import axios from 'axios';

import { createApiAction, createApiReducer, METHODS, STATUSES } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'results';

// REDUCER
const resultsReducer = createApiReducer(ENTITY_NAME);
export default resultsReducer;

// OPERATIONS
export const fetchResult = resultId => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  axios
    .post(
      `${API_URL}/result/${resultId}`,
      {},
      getTokenConfig(getState))
    .then((res) => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
    })
    .catch((err) => {
      displayError('Unable to fetch result')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
    });
};

export const updateResult = (result) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));
  console.log('object:', result);
  axios
    .post(
      `${API_URL}/result/update/${result.id}`,
      result = {
        'id': null,
        'createdBy': null,
        'createdDate': null,
        'lastModifiedBy': null,
        'lastModifiedDate': null,
        'user': {
          'email': 'create-candidate@test.com',
          'role': null,
          'name': null,
          'dob': null,
          'gender': null,
        },
        'accuracy': result.accuracy,
        'time': result.time,
        'nodeNum': result.nodeNum,
        'diagnosis': null,
      },
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
    })
    .catch(err => {
      displayError('Unable to create result')(dispatch);
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
    });
};

export const createResult = result => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));
  axios
    .post(
      `${API_URL}/result/create`,
      result,
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE,
        res.data));
    })
    .catch(err => {
      displayError('Unable to create result')(dispatch);
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
    });
};

export const deleteResult = resultId => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));
  axios
    .delete(
      `${API_URL}/result/delete/${resultId}`,
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, resultId));
    })
    .catch(err => {
      displayError('Unable to delete result')(dispatch);
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
    });
};

export const listAllResults = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));
  axios
    .get(
      `${API_URL}/result/`,
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST,
        res.data));
    })
    .catch(err => {
      displayError('Unable to list all results')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
    });
};

export const listUserResults = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));
  axios
    .post(
      `${API_URL}/result/me`,
      {},
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST,
        res.data));
    })
    .catch(err => {
      displayError('Unable to list all user results')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
    });
};

export const getLatestResult = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  axios
    .post(
      `${API_URL}/result/latest`,
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
          res.data));
    })
    .catch(err => {
      displayError('Unable to get latest user result')(dispatch);
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
    });
};

export const listAllPatients = () => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));
  axios
    .get(
      `${API_URL}/result/patients`,
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST,
        res.data));
    })
    .catch(err => {
      displayError('Unable to list all patients')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
    });
};

export const listAllPatientResults = (userEmail) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));
  axios
    .get(
      `${API_URL}/result/patients/${userEmail}`,
      getTokenConfig(getState),
    )
    .then(res => {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST,
        res.data));
    })
    .catch(err => {
      displayError('Unable to list all patients')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
    });
};

// SELECTORS
export const selectResultsLoading = state => state.resultsReducer.isLoading[METHODS.LIST] === true;
export const selectResultsFailed = state => state.resultsReducer.isLoading[METHODS.LIST] === false
  && state.resultsReducer.hasFailed[METHODS.LIST] === true;
export const selectResults = state => state.resultsReducer.items;

export const selectResultLoading = state => state.resultsReducer.isLoading[METHODS.RETRIEVE] === true;
export const selectResultFailed = state => state.resultsReducer.isLoading[METHODS.RETRIEVE] === false && state.resultsReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectResult = state => state.resultsReducer.item;
