import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import play from './play';
import playlist from './playlist';
import queue from './queue';
import like from './like';
import history from './history';
export default combineReducers({
  like,
  alert,
  auth,
  history,
  play,
  playlist,
  queue,
});
