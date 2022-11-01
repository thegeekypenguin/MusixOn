import {
  ADD_TO_PLAYLIST,
  DELETE_FROM_PLAYLIST,
  LOAD_PLAYLIST,
  PLAYLIST_CHECK,
} from '../actions/types';

const initialState = {
  playlistSongs: [],
  playlistCheck: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_PLAYLIST:
      return {
        ...state,
      };
    case LOAD_PLAYLIST:
      return {
        ...state,
        playlistSongs: payload,
      };
    case DELETE_FROM_PLAYLIST:
      return {
        ...state,
        playlistSongs: state.playlistSongs.filter(
          (song) => song._id !== payload
        ),
      };
    case PLAYLIST_CHECK:
      return {
        ...state,
        playlistCheck: payload,
      };
    default:
      return state;
  }
}
