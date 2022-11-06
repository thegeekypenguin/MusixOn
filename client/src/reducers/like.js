import { LIKE_SONG, LOAD_LIKED_SONGS, UNLIKE_SONG } from '../actions/types';

const initialState = {
  likedSongs: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIKE_SONG:
      return {
        ...state,
      };
    case LOAD_LIKED_SONGS:
      return {
        ...state,
        likedSongs: payload,
      };
    case UNLIKE_SONG:
      return {
        ...state,
        likedSongs: state.likedSongs.filter((song) => song._id !== payload),
      };
    default:
      return state;
  }
}
