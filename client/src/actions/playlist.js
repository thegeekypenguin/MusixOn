import {
  ADD_TO_PLAYLIST,
  DELETE_FROM_PLAYLIST,
  LOAD_PLAYLIST,
  PLAYLIST_CHECK,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const addToPlaylist =
  ({ title, subtitle, image }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(image);
    const body = JSON.stringify({ title, subtitle, image });
    
    try {
      console.log(body);
      const res = await axios.post('/api/playlist', body, config);
      console.log(res);
      dispatch({
        type: ADD_TO_PLAYLIST,
      });
      dispatch(setAlert('Song added to playlist', 'success'));
    } catch (err) {
      console.log(err.message);
    }
  };

export const loadPlaylist = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/playlist');
    dispatch({
      type: LOAD_PLAYLIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const setPlaylistCheck = (value) => (dispatch) => {
  dispatch({
    type: PLAYLIST_CHECK,
    payload: value,
  });
};

export const deleteFromPlaylist = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/playlist/${id}`);
    dispatch({
      type: DELETE_FROM_PLAYLIST,
      payload: id,
    });
    dispatch(setAlert('Song removed', 'success'));
  } catch (err) {
    console.log(err.message);
  }
};
