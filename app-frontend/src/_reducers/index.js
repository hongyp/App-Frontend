import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { project } from './project.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  project
});

export default rootReducer;