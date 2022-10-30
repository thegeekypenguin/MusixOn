import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import play from './play';
export default combineReducers({
  alert,
  auth,
  play,
});
