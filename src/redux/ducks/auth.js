import { API_URL, MAX_ACCESS_TOKEN_AGE } from '../../utils/constants';
import axios from 'axios';
import { displayError } from './errors';
import { getCurrentTime } from '../../utils/getCurrentTime';
import { getTokenConfig } from './authHelper';

// ACTION TYPES
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST';
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE';

// REDUCER
const initialState = {
  userLoading: true,
  userFailed: null,
  user: {},
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  expires_in: localStorage.getItem('expires_in'),
  time_token_acquired: localStorage.getItem('time_token_acquired'),
};

export default function _auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      // Store refresh and access token in localStorage
      const {
        access_token,
        refresh_token,
        expires_in,
      } = action.payload;

      const currentTime = getCurrentTime();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in);
      localStorage.setItem('time_token_acquired', currentTime);

      return {
        ...state,
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
        time_token_acquired: currentTime,
      };

    case LOGOUT:
      // Remove refresh and access token in localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('current_user');
      localStorage.removeItem('time_token_acquired');

      return {
        ...state,
        user: {},
        access_token: '',
        refresh_token: '',
        expires_in: 0,
        time_token_acquired: '',
      };

    case FETCH_ME_REQUEST:
      return {
        ...state,
        userLoading: true,
        userFailed: false,
      };

    case FETCH_ME_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
      };

    case FETCH_ME_FAILURE:
      return {
        ...state,
        userLoading: false,
        userFailed: true,
      };

    default:
      return state;
  }
}

// ACTION CREATORS
export function loginAction(payload) {
  return {
    type: LOGIN,
    payload: payload,
  };
}


export function logoutAction() {
  return {
    type: LOGOUT,
  };
}

export function fetchMeRequestAction(payload) {
  return {
    type: FETCH_ME_REQUEST,
    payload: payload,
  };
}

export function fetchMeSuccessAction(userInfo) {
  return {
    type: FETCH_ME_SUCCESS,
    payload: userInfo,
  };
}

export function fetchMeFailureAction() {
  return {
    type: FETCH_ME_FAILURE,
  };
}

// OPERATIONS
export const authenticateLogin = userData => dispatch => {
  let formdata = new FormData();
  formdata.append('username', userData.username);
  formdata.append('password', userData.password);
  formdata.append('grant_type', 'password');

  axios
    .post(`${API_URL}/oauth/token`, formdata, {
      headers: {
        Authorization: `Basic ${btoa('my-client:my-secret')}`,
      },
    })
    .then((res) => {
      fetchMe(res.data.access_token)(dispatch);
      dispatch(loginAction(res.data));
    })
    .catch((err) => {
      displayError('Unable to login')(dispatch);
      dispatch(fetchMeFailureAction());
    });
};

export const refreshTokenLogin = () => (dispatch, getState) => {
  let timeAcquiredToken = Date.parse(getState().authReducer.time_token_acquired);

  if (new Date() - timeAcquiredToken > MAX_ACCESS_TOKEN_AGE) {
    let formdata = new FormData();
    formdata.append('refresh_token', getState().authReducer.refresh_token);
    formdata.append('grant_type', 'refresh_token');

    axios
      .post(`${API_URL}/oauth/token`, formdata, {
        headers: {
          Authorization: `Basic ${btoa('my-client:my-secret')}`,
        },
      })
      .then((res) => {
        fetchMe(res.data.access_token)(dispatch);
        dispatch(loginAction(res.data));
      })
      .catch((err) => {
        displayError('Unable to login')(dispatch);
        dispatch(fetchMeFailureAction());
      });
  } else {
    fetchMe(getState().authReducer.access_token)(dispatch);
    dispatch(fetchMeRequestAction());
  }

};

export const logout = () => (dispatch, getState) => {
  axios
    .delete(`${API_URL}/oauth/revoke`, getTokenConfig(getState))
    .then(() => {
      dispatch(logoutAction());
    })
    .catch((err) => {
      displayError('Unable to logout')(dispatch);
    });
};

export const fetchMe = (access_token) => (dispatch) => {
  dispatch(fetchMeRequestAction());

  axios
    .post(
      `${API_URL}/users/me/`,
      {},
      {
        headers: {
          Authorization: `bearer ${access_token}`,
        },
      },
    )
    .then((res) => {
      dispatch(fetchMeSuccessAction(res.data));
    })
    .catch((err) => {
      displayError('Unable to fetch current user information')(dispatch);
      dispatch(fetchMeFailureAction());
    });
};

// SELECTORS
export const selectUserLoading = (state) =>
  state.authReducer.userLoading === true;
export const selectUserFailed = (state) =>
  state.authReducer.userLoading === false &&
  state.authReducer.userFailed === true;
export const selectUser = (state) => state.authReducer.user;

export const selectRefreshToken = (state) => state.authReducer.refresh_token;