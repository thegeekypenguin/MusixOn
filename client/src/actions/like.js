import { LIKE_SONG, LOAD_LIKED_SONGS } from "./types";

export const likeSong = () => {
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
        } catch (err) {
          console.log(err.message);
        }
      };
}

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
}