import {
  SONG_PLAYING,
  SONG_NOT_PLAYING,
  LOAD_SONGS,
  LOAD_CURRENT_SONG,
  LOAD_AUDIO,
  INDEX,
  LOADING_SONG,
} from '../actions/types';

export const setCurrentSong = (song) => (dispatch) => {
  dispatch({
    type: LOAD_CURRENT_SONG,
    payload: song,
  });
};

export const setSongs = (songs) => (dispatch) => {
  dispatch({
    type: LOAD_SONGS,
    payload: songs,
  });
};

export const setPlaying = () => (dispatch) => {
  dispatch({
    type: SONG_PLAYING,
  });
};

export const setNotPlaying = () => (dispatch) => {
  dispatch({
    type: SONG_NOT_PLAYING,
  });
};

export const setAudio = (url) => (dispatch) => {
  dispatch({
    type: LOAD_AUDIO,
    payload: url,
  });
};

export const setIndex = (index) => (dispatch) => {
  dispatch({
    type: INDEX,
    payload: index,
  });
};

export const setLoading = (value) => (dispatch) => {
  dispatch({
    type: LOADING_SONG,
    payload: value,
  });
};
