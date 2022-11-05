import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MusicPlayer from './MusicPlayer';
import Song from './Song';
import { connect } from 'react-redux';
import { setSongs } from '../../actions/play';
import { setPlaylistCheck } from '../../actions/playlist';
import { setQueueCheck } from '../../actions/queue';

const Category = ({ setSongs, setPlaylistCheck, setQueueCheck }) => {
  useEffect(() => {
    async function call() {
      var q = window.location.pathname.slice(1);
      // const options = {};
      if (q === 'top-indian-songs') {
        const options = {
          method: 'GET',
          url: 'https://shazam-core.p.rapidapi.com/v1/charts/country',
          params: { country_code: 'IN' },
          headers: {
            'X-RapidAPI-Key':
              '841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1',
            'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
          },
        };
        try {
          const res = await axios.request(options);
          console.log(res.data[0].title);
          setSongs(res.data);
          setPlaylistCheck(false);
          setQueueCheck(false);
        } catch (err) {
          console.log(err.message);
        }
      } else if (q === 'top-world-songs') {
        const options = {
          method: 'GET',
          url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
          headers: {
            'X-RapidAPI-Key':
              '841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1',
            'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
          },
        };
        try {
          const res = await axios.request(options);
          console.log(res.data[0].title);
          setSongs(res.data);
          setPlaylistCheck(false);
          setQueueCheck(false);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        const options = {
          method: 'GET',
          url: 'https://shazam-core.p.rapidapi.com/v1/charts/genre-world',
          params: { genre_code: q },
          headers: {
            'X-RapidAPI-Key':
              '841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1',
            'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
          },
        };
        try {
          const res = await axios.request(options);
          console.log(res.data[0].title);
          setSongs(res.data);
          setPlaylistCheck(false);
          setQueueCheck(false);
        } catch (err) {
          console.log(err.message);
        }
      }
    }
    call();
  }, []);
  return (
    <div>
      <header
        className="header-main"
        style={{
          background:
            ' no-repeat center/cover url("https://img.freepik.com/premium-photo/classic-sheets-with-music-notes-sign_488220-9925.jpg?w=2000")',
          height: "30vw",
          position: "relative",
          objectFit: "contain",
        }}
      > </header>
      <Song />
      {/* <MusicPlayer /> */}
    </div>
  );
};

Category.propTypes = {};

export default connect(null, { setPlaylistCheck, setQueueCheck, setSongs })(
  Category
);
