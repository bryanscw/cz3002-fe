import axios from "axios";
import {
  createApiReducer,
  createApiAction,
  STATUSES,
  METHODS
} from "./apiHelper";
import { API_URL } from "../../utils/constants";
import { displayError } from "./errors";
import { getTokenConfig } from "./authHelper";

const ENTITY_NAME = "diagnosis";

// REDUCER
const diagnosisReducer = createApiReducer(ENTITY_NAME, "id");
export default diagnosisReducer;

// OPERATIONS
export const fetchDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

  return axios
    .post(`${API_URL}/diagnosis/1`, diagnosis, getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data)
      );
    })
    .catch((err) => {
      displayError("Unable to get diagonosis")(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
    });
};

export const createDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

  return axios
    .post(`${API_URL}/diagnosis/create/${diagnosis.resultId}`, diagnosis, getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data)
      );
    })
    .catch((err) => {
      displayError("Unable to create diagonosis")(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
    });
};

export const deleteDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

  return axios
    .delete(`${API_URL}/diagnosis/${diagnosis.id}`, getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(
          ENTITY_NAME,
          STATUSES.SUCCESS,
          METHODS.DELETE,
          diagnosis.id
        )
      );
    })
    .catch((err) => {
      displayError("Unable to delete diagnosis")(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
    });
};

export const updateDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));
console.log(diagnosis);
  return axios
    .post(`${API_URL}/update/${diagnosis.id}`,diagnosis, getTokenConfig(getState))
    .then((res) => {
      dispatch(
        createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data)
      );
    })
    .catch((err) => {
      displayError("Unable to update diagnosis")(dispatch);
      dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
    });
};
