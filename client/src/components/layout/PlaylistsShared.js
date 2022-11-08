import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSongs } from '../../actions/play';
import Song from './Song';

const PlaylistsShared = ({ user, setSongs }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [playlist, setPlaylist] = useState([]);

  const handleChange = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get(`/api/sharePlaylist/id/${userId}`);
        console.log(res.data.playlist);
        setSongs(res.data.playlist);
      } catch (err) {
        console.log(err.message);
      }
    } call();
  }, [userId]);

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get('/api/sharePlaylist');
        console.log(res.data)
        var array = new Array();
        for (var i = 0; i < res.data.length; i++) {
          try {
            const result = await axios.get(
              `/api/users/id/${res.data[i].sender}`
            );
            array.push(result.data);
          } catch (err) {
            console.log(err.message);
          }
        }
        console.log(array);
        setUsers(array);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  return (
    <div>
      <select
        class='form-select'
        aria-label='Default select example'
        onChange={(e) => handleChange(e.target.value)}
      >
        <option selected>Select user</option>
        {users.map((user) => {
          console.log(user._id);
          return <option value={user._id}>{user.name}</option>;
        })}
      </select>
      <Song />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

PlaylistsShared.propTypes = {};

export default connect(mapStateToProps, { setSongs })(PlaylistsShared);
