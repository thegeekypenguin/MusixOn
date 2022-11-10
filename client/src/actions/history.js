// actions to add songs into the history
import {
  GET_HISTORY,
  HISTORY_ERRORS,
  ADD_SONG_HISTORY_FAIL,
  HISTORY_CHECK,
  ADD_SONG_HISTORY_SUCESS,
  REMOVE_SONG_HISTORY,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getCurrentUserHistory = () => async (dispatch) => {
  try {
    console.log('working..');
    //error
    const res = await axios.get('/api/history');
    console.log(res.data);
    dispatch({
      type: GET_HISTORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_ERRORS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//ADD SONG IN THE HISTORY
export const addCurrentSongInHistory =
  ({ title, subtitle, image }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // const user = req.user;
    // const body = JSON.stringify(formData);
    const body = JSON.stringify({ title, subtitle, image });
    console.log('Song going to add in history');
    console.log(body);
    try {
      const res = await axios.post('/api/history/song', body, config);
      console.log('Song addddd..');
      dispatch({
        type: ADD_SONG_HISTORY_SUCESS,
      });
      // history.push('/dashboard');
      dispatch(setAlert('song added in history', 'success'));
    } catch (err) {
      console.log(err.message);
      // const errors = err.response.data.errors;
      // if(errors){
      //     errors.foreach((error)=>dispatch(setAlert(error.msg,'danger')));
      // }
      // dispatch({
      //     type:ADD_SONG_HISTORY_FAIL,
      //     payload:errors
      // });
    }
  };
//@route /api/history/:id
export const deleteFromHistory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/history/${id}`);
    dispatch({
      type: REMOVE_SONG_HISTORY,
      payload: id,
    });
    dispatch(setAlert('Song removed', 'success'));
  } catch (error) {
    console.log(error.message);
  }
};

export const setHistoryCheck = (value) => (dispatch) => {
  dispatch({
    type: HISTORY_CHECK,
    payload: value,
  });
};
