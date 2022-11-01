import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import play from './play';
import playlist from './playlist';
import queue from './queue';
export default combineReducers({
  alert,
  auth,
  play,
  playlist,
  queue,
});
