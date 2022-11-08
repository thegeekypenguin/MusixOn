import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadPlaylist } from '../../actions/playlist';
import { setAlert } from '../../actions/alert';

const SharePlaylist = ({ loadPlaylist, playlistSongs, user, setAlert }) => {
  const handleSharePlaylistToEmail = async (email) => {
    try {
      const res = await axios.get(`/api/users/${email}`);
      await loadPlaylist();
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const sender = user._id;
      const receiver = res.data._id;
      console.log(res);
      console.log(sender)
      console.log(receiver)
      const body = JSON.stringify({ sender, receiver, playlistSongs });
      const a = await axios.put(`/api/sharePlaylist/${receiver}`, body, config);
      setAlert('Playlist shared', 'success');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <input type='text' name='email' id='email' />
      <button
        className='btn btn-primary'
        onClick={(e) =>
          handleSharePlaylistToEmail(document.getElementById('email').value)
        }
      >
        Share
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playlistSongs: state.playlist.playlistSongs,
  user: state.auth.user,
});

SharePlaylist.propTypes = {};

export default connect(mapStateToProps, { loadPlaylist, setAlert })(
  SharePlaylist
);
