import { LIKE_SONG, LOAD_LIKED_SONGS } from '../actions/types';

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
    default:
      return state;
  }
}
