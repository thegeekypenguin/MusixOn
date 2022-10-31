import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import {
  setCurrentSong,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  setLoading,
  setArtistId,
} from '../../actions/play';
import axios from 'axios';

const Song = ({
  songs,
  playing,
  setPlaying,
  setNotPlaying,
  currentSong,
  audio,
  setAudio,
  index,
  setIndex,
  setLoading,
  loading,
  artistId,
  setArtistId,
}) => {
  // const [audio, setAudio] = useState(new Audio());

  // useEffect(() => {
  //   if(!playing)
  //   audio.pause();
  //   audio.currentTime = 0;
  //   // setAudio();
  // }, []);

  useEffect(() => {
    audio.play();
    setLoading(false);
  }, [audio]);

  async function handleClick(song) {
    if (!playing) {
      setLoading(true);
      setPlaying();
      setCurrentSong(song);
      setIndex(songs.indexOf(song));
      console.log(index);
      const options = {
        method: 'GET',
        url: 'https://youtube-music1.p.rapidapi.com/v2/search',
        params: { query: song?.title },
        headers: {
          'X-RapidAPI-Key':
            '706d3a5b38mshe15b089b58ae6f0p168fa8jsn35fe315b0a5b',
          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com',
        },
      };
      try {
        const res = await axios.request(options);
        const id = res.data.result.songs[0].id;
        console.log(id);
        const options2 = {
          method: 'GET',
          url: 'https://youtube-music1.p.rapidapi.com/get_download_url',
          params: { id: id, ext: 'mp3' },
          headers: {
            'X-RapidAPI-Key':
              '706d3a5b38mshe15b089b58ae6f0p168fa8jsn35fe315b0a5b',
            'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com',
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else if (currentSong.title === song.title) {
      setNotPlaying();
      audio.pause();
    } else {
      setLoading(true);
      setPlaying();
      audio.pause();
      audio.currentTime = 0;
      setCurrentSong(song);
      setIndex(songs.indexOf(song));
      const options = {
        method: 'GET',
        url: 'https://youtube-music1.p.rapidapi.com/v2/search',
        params: { query: song.title },
        headers: {
          'X-RapidAPI-Key':
            '706d3a5b38mshe15b089b58ae6f0p168fa8jsn35fe315b0a5b',
          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com',
        },
      };
      try {
        const res = await axios.request(options);
        const id = res.data.result.songs[0].id;
        console.log(id);
        const options2 = {
          method: 'GET',
          url: 'https://youtube-music1.p.rapidapi.com/get_download_url',
          params: { id: id, ext: 'mp3' },
          headers: {
            'X-RapidAPI-Key':
              '706d3a5b38mshe15b089b58ae6f0p168fa8jsn35fe315b0a5b',
            'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com',
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  console.log(songs);

  return (
    <div>
      <Row>
        {songs.map((song) => (
          <Col key={song.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(song)}
              key={song.key}
            >
              <Card.Img
                className={playing ? 'bg-secondary' : 'bg-primary'}
                src={song?.images?.coverart}
                style={{ height: '15vw', objectFit: 'cover' }}
              />

              <Card.Body>
                <Card.Title>
                  <strong>{song.title}</strong>
                </Card.Title>
                <div>Singer: {song.subtitle}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.play.songs,
  playing: state.play.playing,
  currentSong: state.play.currentSong,
  audio: state.play.audio,
  index: state.play.index,
  loading: state.play.loading,
  artistId: state.play.artistId,
});

Song.propTypes = {
  songs: PropTypes.array.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  currentSong: PropTypes.object,
  setAudio: PropTypes.func.isRequired,
  audio: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired,
  setArtistId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setCurrentSong,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  setLoading,
  setArtistId,
})(Song);
