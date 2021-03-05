import { combineReducers } from "redux";

import authReducer from "./ducks/auth";
import errorsReducer from "./ducks/errors";

export default combineReducers({
  authReducer,
  errorsReducer
});
