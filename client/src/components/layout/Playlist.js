import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPlaylist, setPlaylistCheck } from '../../actions/playlist';
import { setSongs } from '../../actions/play';
import MusicPlayer from './MusicPlayer';
import { setQueueCheck } from '../../actions/queue';
import Song from './Song';
import { useNavigate } from 'react-router-dom';

const Playlist = ({
  playlistSongs,
  loadPlaylist,
  setSongs,
  playlistCheck,
  setPlaylistCheck,
  setQueueCheck,
}) => {
  useEffect(() => {
    setSongs([]);
    loadPlaylist();
  }, []);

  useEffect(() => {
    setSongs(playlistSongs);
    setPlaylistCheck(true);
    setQueueCheck(false);
  }, [playlistSongs]);

  const navigate = useNavigate();
  console.log(playlistSongs);

  const handleSharePlaylist = () => {
    navigate('/share');
  }

  return (
    <div>
      <Song />
      <button className='btn btn-danger' onClick={handleSharePlaylist}>Share</button>
    </div>
  );
};

Playlist.propTypes = {
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
});

export default connect(mapStateToProps, {
  loadPlaylist,
  setSongs,
  setPlaylistCheck,
  setQueueCheck,
})(Playlist);
