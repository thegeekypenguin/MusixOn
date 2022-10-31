import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MusicPlayer from '../layout/MusicPlayer';
import Song from '../layout/Song';
import { connect } from 'react-redux';
import { setCurrentSong, setSongs } from '../../actions/play';
import axios from 'axios';
import Search from '../layout/Search';

const Dashboard = ({ setSongs }) => {
  useEffect(() => {
    async function call() {
      // const options = {
      //   method: 'GET',
      //   url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
      //   headers: {
      //     'X-RapidAPI-Key':
      //       '6d949040fdmshfdcdc66ae8a65ccp1c0957jsnb0af325e6225',
      //     'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      //   },
      // };
      const options = {
        method: 'GET',
        url: 'https://shazam-core.p.rapidapi.com/v1/charts/country',
        params: { country_code: 'IN' },
        headers: {
          'X-RapidAPI-Key':
            '6d949040fdmshfdcdc66ae8a65ccp1c0957jsnb0af325e6225',
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
        },
      };
      // const options = {
      //   method: 'GET',
      //   url: 'https://shazam.p.rapidapi.com/charts/track',
      //   params: {
      //     locale: 'en-US',
      //     listId: 'ip-country-chart-IN',
      //     pageSize: '20',
      //     startFrom: '0',
      //   },
      //   headers: {
      //     'X-RapidAPI-Key':
      //       '6d949040fdmshfdcdc66ae8a65ccp1c0957jsnb0af325e6225',
      //     'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      //   },
      // };
      try {
        const res = await axios.request(options);
        console.log(res.data[0].title);
        setSongs(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  return (
    <div>
      <Song />
      <MusicPlayer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.play.songs,
  currentSong: state.play.currentSong,
});

Dashboard.propTypes = {
  setSongs: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
};

export default connect(mapStateToProps, { setSongs, setCurrentSong })(
  Dashboard
);
