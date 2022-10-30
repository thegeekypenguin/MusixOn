import {
  SONG_PLAYING,
  SONG_NOT_PLAYING,
  LOAD_SONGS,
  LOAD_CURRENT_SONG,
  LOAD_AUDIO,
  INDEX,
  LOADING_SONG,
} from '../actions/types';

const initialState = {
  index: -1,
  playing: false,
  songs: [],
  currentSong: {},
  audio: new Audio(''),
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SONG_PLAYING:
      return {
        ...state,
        playing: true,
      };
    case SONG_NOT_PLAYING:
      return {
        ...state,
        playing: false,
      };
    case LOAD_CURRENT_SONG:
      return {
        ...state,
        currentSong: payload,
      };
    case LOAD_SONGS:
      return {
        ...state,
        songs: payload,
      };
    case LOAD_AUDIO:
      return {
        ...state,
        audio: new Audio(payload),
      };
    case INDEX:
      return {
        ...state,
        index: payload,
      };
    case LOADING_SONG:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}
