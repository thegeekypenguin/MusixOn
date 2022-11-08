import {
  SONG_PLAYING,
  SONG_NOT_PLAYING,
  LOAD_SONGS,
  LOAD_CURRENT_SONG,
  LOAD_AUDIO,
  INDEX,
  LOADING_SONG,
  LOAD_ARTIST,
  ARTIST_ID,
} from '../actions/types';



export const setCurrentSong = (song) => (dispatch) => {

  console.log(song,"setCurrentSong actionnnnnnnnnnnnnnnnnd")
  dispatch({
    type: LOAD_CURRENT_SONG,
    payload: song,
  });
};

export const setSongs = (songs) => (dispatch) => {
  console.log(songs, "setSongs actionnnnnnnnnnnnnnnnnd")

  dispatch({
    type: LOAD_SONGS,
    payload: songs,
  });
};

export const setPlaying = () => (dispatch) => {
  console.log("setPlaying actionnnnnnnnnnnnnnnnnd")

  dispatch({
    type: SONG_PLAYING,
  });
};

export const setNotPlaying = () => (dispatch) => {
  console.log( "setNotPlaying actionnnnnnnnnnnnnnnnnd")

  dispatch({
    type: SONG_NOT_PLAYING,
  });
};

export const setAudio = (url) => (dispatch) => {
  console.log( url,"setAudio actionnnnnnnnnnnnnnnnnd")

  dispatch({
    type: LOAD_AUDIO,
    payload: url,
  });
};

export const setIndex = (index) => (dispatch) => {

  console.log( index,"setIndex actionnnnnnnnnnnnnnnnnd")
  dispatch({
    type: INDEX,
    payload: index,
  });
};

export const setLoading = (value) => (dispatch) => {
  console.log( value,"setLoading actionnnnnnnnnnnnnnnnnd")

  dispatch({
    type: LOADING_SONG,
    payload: value,
  });
};

export const setArtist = (value) => (dispatch) => {
  dispatch({
    type: LOAD_ARTIST,
    payload: value,
  });
};

export const setArtistId = (value) => (dispatch) => {
  dispatch({
    type: ARTIST_ID,
    payload: value,
  });
};
