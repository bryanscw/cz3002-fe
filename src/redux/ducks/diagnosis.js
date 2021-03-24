import axios from "axios";
import {
  createApiAction,
  createApiReducer,
  METHODS,
  STATUSES
} from "./apiHelper";
import {API_URL} from "../../utils/constants";
import {displayError} from "./errors";
import {getTokenConfig} from "./authHelper";

const ENTITY_NAME = "diagnosis";

// REDUCER
const diagnosisReducer = createApiReducer(ENTITY_NAME, "id");
export default diagnosisReducer;

// OPERATIONS
export const fetchDiagnosis = (resultId) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
//let access_token = localStorage.getItem("access_token");
  return (
      axios
      .post(`${API_URL}/diagnosis/${resultId}`, {},
          getTokenConfig(getState))
      .then((res) => {
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE,
                res.data)
        );
        // return res
      })
      .catch((err) => {
        displayError("Unable to fetch diagnosis")(dispatch);
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
      })

  );

};

export const createDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

// console.log(diagnosis.resultId)
  return (
      axios
      .post(`${API_URL}/diagnosis/create/${diagnosis.result}`,
          diagnosis = {
            "id": null,
            "createdBy": null,
            "createdDate": null,
            "lastModifiedBy": null,
            "lastModifiedDate": null,
            "result": null,
            "doctor": null,
            "label": diagnosis.label,
            "description": diagnosis.description,
          },

          getTokenConfig(getState))

      .then((res) => {
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE,
                res.data)
        );
      })
      .catch((err) => {
        displayError("Unable to create diagonosis")(dispatch);
        dispatch(
            createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
      })
  );
};

export const deleteDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

  return axios
  .delete(`${API_URL}/diagnosis/delete/${diagnosis.id}`,
      getTokenConfig(getState))
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
  .then(res => {
    if (res.data === true) {
      dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE,
          diagnosis.id));
    } else {
      throw new Error("Unable to delete Diagnosis");
    }
  })
  .catch((err) => {
    displayError("Unable to delete diagnosis")(dispatch);
    dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
  });
};

export const updateDiagnosis = (diagnosis) => (dispatch, getState) => {
  dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

  return axios
  .post(`${API_URL}/diagnosis/update/${diagnosis.result}`,
      diagnosis = {
        "id": null,
        "createdBy": null,
        "createdDate": null,
        "lastModifiedBy": null,
        "lastModifiedDate": null,
        "result": null,
        "doctor": null,
        "label": diagnosis.label,
        "description": diagnosis.description,
      },

      getTokenConfig(getState))
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
export const selectDiagnosisLoading = state => state.diagnosisReducer.isLoading[METHODS.RETRIEVE]
    === true;
export const selectDiagnosisFailed = state => state.diagnosisReducer.isLoading[METHODS.RETRIEVE]
    === false && state.diagnosisReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectDiagnosis = state => state.diagnosisReducer.item;