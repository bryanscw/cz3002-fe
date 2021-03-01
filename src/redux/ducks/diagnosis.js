import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'diagnosis';

// REDUCER
const diagnosisReducer = createApiReducer(ENTITY_NAME, "id");
export default diagnosisReducer;

// OPERATIONS
export const createDiagnosis = diagnosis => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

  return (
      axios
      .post(
          `${API_URL}/diagnosis/create/${result.id}`,
          result,
          getTokenConfig(getState)
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, result.id));
      })
      .catch(err => {
        displayError("Unable to create diagonosis")(dispatch);
        dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
      })
  );
};

export const deleteDiagnosis = diagnosis => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

  return (
      axios
      .delete(
          `${API_URL}/diagnosis/${diagnosis.id}`,
          getTokenConfig(getState),
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, diagnosis.id));
      })
      .catch(err => {
        displayError("Unable to delete diagnosis")(dispatch);
        dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
      })
  );
};

export const updateDiagnosis = diagnosis =>  (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

  return (
      axios
      .get(
          `${API_URL}/update/${result.id}`,
          getTokenConfig(getState)
      )
      .then(res => {
        dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, result.id));
      })
      .catch(err => {
        displayError("Unable to update diagnosis")(dispatch);
        dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
      })
  );
};



// SELECTORS
//export const selectDiagnosisLoading = state => state.diagnosisReducer.isLoading[METHODS.LIST] === true;
//export const selectDiagnosisFailed = state => state.diagnosisReducer.isLoading[METHODS.LIST] === false && state.diagnosisReducer.hasFailed[METHODS.LIST] === true;
//export const selectDiagnosis = state => state.diagnosisReducer.items;
