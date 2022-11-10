import { LIKE_SONG, LOAD_LIKED_SONGS, UNLIKE_SONG } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const likeSong =
  ({ title, subtitle, image }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ title, subtitle, image });
    try {
      const res = await axios.post('/api/likedSong', body, config);
      dispatch({
        type: LIKE_SONG,
      });
      dispatch(setAlert('Added to liked songs', 'success'));
      console.log('Like song from actions');
    } catch (err) {
      console.log(err.message);
    }
  };

export const getLikedSongs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/likedSong');
    dispatch({
      type: LOAD_LIKED_SONGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const unlikeSong = (title) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/likedSong/${title}`);
    dispatch({
      type: UNLIKE_SONG,
      payload: title,
    });
    dispatch(setAlert('Song removed', 'success'));
  } catch (err) {
    console.log(err.message);
  }
};
