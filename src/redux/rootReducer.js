import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import usersReducer from './ducks/users';
import errorsReducer from './ducks/errors';
import resultsReducer from './ducks/result';
import diagnosisReducer from './ducks/diagnosis';
import graphReducer from './ducks/graph';
export default combineReducers({
  authReducer,
  usersReducer,
  errorsReducer,
  resultsReducer,
  diagnosisReducer,
  graphReducer,
});