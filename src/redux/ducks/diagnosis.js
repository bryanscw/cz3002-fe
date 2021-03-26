import axios from 'axios';
import { createApiAction, createApiReducer, METHODS, STATUSES } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'diagnosis';

// REDUCER
const diagnosisReducer = createApiReducer(ENTITY_NAME);
export default diagnosisReducer;

// OPERATIONS
export const fetchDiagnosis = (resultId) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
  axios
    .post(`${API_URL}/diagnosis/${resultId}`, {},
      getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
          res.data),
      );
    })
    .catch((err) => {
      displayError('Unable to fetch diagnosis')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
    });
};

export const createDiagnosis = (resultId, diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

  axios
    .post(
      `${API_URL}/diagnosis/create/${resultId}`,
      diagnosis = {
        'id': null,
        'createdBy': null,
        'createdDate': null,
        'lastModifiedBy': null,
        'lastModifiedDate': null,
        'result': { 'id': diagnosis.resultId },
        'doctor': null,
        'label': diagnosis.label,
        'description': diagnosis.description,
      },
      getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE,
          res.data),
      );
    })
    .catch((err) => {
      displayError('Unable to create diagonosis')(dispatch);
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
    });
};

export const deleteDiagnosis = (resultId, diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

  axios
    .delete(
      `${API_URL}/diagnosis/delete/${resultId}`,
      getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(
          ENTITY_NAME,
          STATUSES.SUCCESS,
          METHODS.DELETE,
          diagnosis.id,
        ),
      );
    })
    .then(res => {
      if (res.data === true) {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE,
          diagnosis.id));
      } else {
        throw new Error('Unable to delete Diagnosis');
      }
    })
    .catch((err) => {
      displayError('Unable to delete diagnosis')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
    });
};

export const updateDiagnosis = (resultId, diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

  axios
    .post(
      `${API_URL}/diagnosis/update/${resultId}`,
      diagnosis = {
        'id': null,
        'createdBy': null,
        'createdDate': null,
        'lastModifiedBy': null,
        'lastModifiedDate': null,
        'result': null,
        'doctor': null,
        'label': diagnosis.label,
        'description': diagnosis.description,
      },

      getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data),
      );
    })
    .catch((err) => {
      displayError('Unable to update diagnosis')(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
    });
};
export const selectDiagnosisLoading = state => state.diagnosisReducer.isLoading[METHODS.RETRIEVE]
  === true;
export const selectDiagnosisFailed = state => state.diagnosisReducer.isLoading[METHODS.RETRIEVE]
  === false && state.diagnosisReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectDiagnosis = state => state.diagnosisReducer.item;