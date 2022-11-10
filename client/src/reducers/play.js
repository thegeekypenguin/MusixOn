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
  FOLLOW_CHECK
} from '../actions/types';

const initialState = {
  index: -1,
  playing: false,
  songs: [],
  currentSong:  {},
  audio: new Audio(''),
  loading: false,
  artist: {},
  artistId: -1,
  title: '',
  subtitle: '',
  image: '',
  followCheck: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(type, payload, "payloadddddddddddddddddd");
  console.log(typeof (payload), "Data typeeeeeeeeee")
  // console.log(state,{...state,currentSong:payload})
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
        title: payload.title,
        subtitle: payload.subtitle,
        image: payload.image,
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
    case LOAD_ARTIST:
      return {
        ...state,
        artist: payload,
      };
    case ARTIST_ID:
      return {
        ...state,
        artistId: payload,
      };
    case FOLLOW_CHECK:
      return {
        ...state, 
        followCheck: payload
      }
    default:
      return state;
  }
}
