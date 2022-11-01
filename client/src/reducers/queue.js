import {
  ADD_TO_QUEUE,
  DELETE_FROM_QUEUE,
  LOAD_QUEUE,
  QUEUE_CHECK,
  CLEAR_QUEUE,
} from '../actions/types';

const initialState = {
  queueSongs: [],
  queueCheck: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_QUEUE:
      return {
        ...state,
      };
    case DELETE_FROM_QUEUE:
      return {
        ...state,
        queueSongs: state.queueSongs.filter((song) => song._id !== payload),
      };
    case QUEUE_CHECK:
      return {
        ...state,
        queueCheck: payload,
      };
    case LOAD_QUEUE:
      return {
        ...state,
        queueSongs: payload,
      };
    case CLEAR_QUEUE:
      return {
        ...state,
        queueSongs: [],
      };
    default:
      return state;
  }
}
