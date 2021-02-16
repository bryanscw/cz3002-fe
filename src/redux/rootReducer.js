import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import usersReducer from './ducks/users';
import errorsReducer from './ducks/errors';
import resultReducer from './ducks/result';
import diagnosisReducer from './ducks/diagnosis';

export default combineReducers({
  authReducer,
  usersReducer,
  errorsReducer,
  resultReducer,
  diagnosisReducer,
});
