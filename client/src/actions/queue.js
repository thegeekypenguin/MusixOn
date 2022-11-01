import {
  ADD_TO_QUEUE,
  DELETE_FROM_QUEUE,
  LOAD_QUEUE,
  QUEUE_CHECK,
  CLEAR_QUEUE,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const addToQueue =
  ({ title, subtitle, image }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ title, subtitle, image });
    try {
      const res = await axios.post('/api/queue', body, config);
      dispatch({
        type: ADD_TO_QUEUE,
      });
      dispatch(setAlert('Song added to queue', 'success'));
    } catch (err) {
      console.log(err.message);
    }
  };

export const loadQueue = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/queue');
    dispatch({
      type: LOAD_QUEUE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const setQueueCheck = (value) => (dispatch) => {
  dispatch({
    type: QUEUE_CHECK,
    payload: value,
  });
};

export const deleteFromQueue = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/queue/${id}`);
    dispatch({
      type: DELETE_FROM_QUEUE,
      payload: id,
    });
    dispatch(setAlert('Song removed', 'success'));
  } catch (err) {
    console.log(err.message);
  }
};

export const clearQueue = () => async (dispatch) => {
  try {
    await axios.delete('/api/queue');
    dispatch({
      type: CLEAR_QUEUE,
    });
  } catch (err) {
    console.log(err.message);
  }
};
