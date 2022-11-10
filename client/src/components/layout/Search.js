import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setCurrentSong,
  setSongs,
  setArtist,
  setArtistId,
} from '../../actions/play';
import axios from 'axios';
import MusicPlayer from './MusicPlayer';
import Song from './Song';
import { Row, Col, Card } from 'react-bootstrap';

const Search = ({ songs, setSongs, artist, setArtist, setArtistId }) => {
  const [tempSearch, setTempSearch] = useState([]);
  const [searchArtists, setSearchArtists] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
     
    setSongs([]);
  }, []);

  const handleChange = async (e) => {
    if (e.target.value !== '') {
      const options = {
        method: 'GET',
        url: 'https://shazam-core.p.rapidapi.com/v1/search/suggest',
        params: { query: e.target.value },
        headers: {
          'X-RapidAPI-Key':
            '   14c05f9d39msh620bb14ad7e9531p102005jsna39efb78a39b',
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
        },
      };
      try {
        const res = await axios.request(options);
        setTempSearch(res.data.hints);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleArtistClick = async (id) => {
    setArtistId(id);
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v2/artists/details',
      params: { artist_id: id },
      headers: {
        'X-RapidAPI-Key': '   14c05f9d39msh620bb14ad7e9531p102005jsna39efb78a39b',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    };
    try {
      const res = await axios.request(options);
      setArtist(res.data);
      console.log(res.data);
      navigate('/artist');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = async (i) => {
    // console.log(i);
    document.getElementById('search_bar').value = i;
    setTempSearch([]);
    setSongs([]);
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/search/multi',
      params: { query: i, search_type: 'SONGS_ARTISTS' },
      headers: {
        'X-RapidAPI-Key': '   14c05f9d39msh620bb14ad7e9531p102005jsna39efb78a39b',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    };
    try {
      const res = await axios.request(options);
      setSongs([]);
      //   console.log(res.data);
      var array = new Array();
      res.data.tracks?.hits?.map((track) => {
        array.push(track?.track);
      });
      setSearchArtists(res.data.artists);
      console.log(res.data.artists);
      setSongs(array);
    } catch (err) {
      console.log(err.message);
    }
  };

  //   document.getElementById('box').addEventListener('click', () => handleClick(this.))

  return (
    <div>
      <div class='input-group rounded'>
        <input
          type='search'
          id='search_bar'
          class='form-control rounded'
          placeholder='Search'
          aria-label='Search'
          aria-describedby='search-addon'
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <span class='input-group-text border-0' id='search-addon'>
          <i
            class='fas fa-search'
            onClick={(e) =>
              handleClick(document.getElementById('search_bar').value)
            }
            style={{ cursor: 'pointer' }}
          ></i>
        </span>
      </div>
      {tempSearch?.map((i) => {
        const name = i.term;
        return (
          <div
            id='box'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleClick(i.term);
            }}
          >
            <h4>{i.term}</h4>
          </div>
        );
      })}
      <h2>Tracks</h2>
      <Song />
      <h2>Artists</h2>
      <Row>
        {searchArtists?.hits?.map((artist) => (
          <Col key={artist?.artist?.adamid} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={artist.key}
              onClick={() => {
                handleArtistClick(artist.artist.adamid);
              }}
            >
              <Card.Img
                //   className={playing ? 'bg-secondary' : 'bg-primary'}
                src={artist?.artist?.avatar}
                style={{ height: '15vw', objectFit: 'cover' }}
              />

              <Card.Body>
                <Card.Title>
                  <strong>{artist?.artist?.name}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <MusicPlayer /> */}
    </div>
  );
};

Search.propTypes = {};

const mapStateToProps = (state) => ({
  playing: state.play.playing,
  songs: state.play.songs,
  artist: state.play.artist,
});

export default connect(mapStateToProps, {
  setCurrentSong,
  setSongs,
  setArtist,
  setArtistId,
})(Search);
