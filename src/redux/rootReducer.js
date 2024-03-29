import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import usersReducer from './ducks/users';
import errorsReducer from './ducks/errors';
import resultsReducer from './ducks/result';
import diagnosisReducer from './ducks/diagnosis';
import timeGraphReducer from './ducks/timeGraph';
import accGraphReducer from './ducks/accGraph';

export default combineReducers({
  authReducer,
  usersReducer,
  errorsReducer,
  resultsReducer,
  diagnosisReducer,
  accGraphReducer,
  timeGraphReducer,
});