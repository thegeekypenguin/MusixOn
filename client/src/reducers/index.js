import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import play from './play';
import playlist from './playlist';
import queue from './queue';
import like from './like';
export default combineReducers({
  like,
  alert,
  auth,
  play,
  playlist,
  queue,
});
