import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPlaylist, setPlaylistCheck } from '../../actions/playlist';
import { setSongs } from '../../actions/play';
import MusicPlayer from './MusicPlayer';
import { setQueueCheck } from '../../actions/queue';
import Song from './Song';
import { getLikedSongs } from '../../actions/like';

const LikedSong = ({
  playlistSongs,
  loadPlaylist,
  setSongs,
  playlistCheck,
  setPlaylistCheck,
  setQueueCheck,
  getLikedSongs,
  likedSongs,
}) => {
  useEffect(() => {
    setSongs([]);
    getLikedSongs();
  }, []);

  useEffect(() => {
    setSongs(likedSongs);
  }, [likedSongs]);

  console.log(playlistSongs);

  return (
    <div>
      <Song />
      {/* <MusicPlayer /> */}
    </div>
  );
};

LikedSong.propTypes = {
  playlistSongs: PropTypes.array.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  setSongs: PropTypes.func.isRequired,
  playlistCheck: PropTypes.bool.isRequired,
  setPlaylistCheck: PropTypes.func.isRequired,
  setQueueCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistSongs: state.playlist.playlistSongs,
  playlistCheck: state.playlist.playlistCheck,
  likedSongs: state.like.likedSongs,
});

export default connect(mapStateToProps, {
  loadPlaylist,
  setSongs,
  setPlaylistCheck,
  setQueueCheck,
  getLikedSongs
})(LikedSong);
