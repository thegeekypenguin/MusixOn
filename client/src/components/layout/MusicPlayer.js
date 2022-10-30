import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import './style.css';
import 'https://kit.fontawesome.com/26504e4a1f.js';
import song1 from './songs/Kesariya.mp3';
import song2 from './songs/Deva Deva.mp3';
import song3 from './songs/Kya Mujhe Pyar Hai.mp3';
import songslist from '../../songs.json';
import Song from './Song';
import { lazy } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setCurrentSong,
  setNotPlaying,
  setPlaying,
  setSongs,
  setAudio,
  setIndex,
  setLoading,
} from '../../actions/play';

const MusicPlayer = ({
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
  playing,
  setNotPlaying,
  setPlaying,
  audio,
  setAudio,
  index,
  setIndex,
  setLoading,
  loading,
}) => {
  // const [index, setIndex] = useState(0);
  // const [audio, setAudio] = useState(new Audio(song2));

  const [shuffleOn, setShuffleOn] = useState(false);
  const [randomArray, setRandomArray] = useState([]);
  const [counter, setCounter] = useState(0);

  function handleShuffle() {
    if (counter < randomArray.length) {
      setIndex(randomArray[counter]);
      setCounter(counter + 1);
    } else {
      setIndex(randomArray[0]);
      setCounter(0);
    }
  }

  useEffect(() => {
    if (shuffleOn) {
      var array = new Array();
      for (var i = 0; i < songs.length; i++) array.push(i);
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      setRandomArray(array);
      if (!playing) handleShuffle();
    }
  }, [shuffleOn]);

  useEffect(() => {
    async function call() {
      audio.pause();
      audio.currentTime = 0;
      setNotPlaying();
      setLoading(true);
      setCurrentSong(songs[index]);
      const options = {
        method: 'GET',
        url: 'https://youtube-music1.p.rapidapi.com/v2/search',
        params: { query: songs[index].title },
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
          setPlaying();
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, [index]);

  useEffect(() => {
    if (playing) audio.play();
    setLoading(false);
  }, [audio]);

  const handlePlayAndPause = () => {
    if (playing) {
      // Pause the song if it is playing
      let x = audio;
      x.pause();
      setNotPlaying();
    } else {
      // Play the song if it is paused
      if (audio.src === 'http://localhost:3000/dashboard') {
        if (shuffleOn) {
          handleShuffle();
        } else {
          setIndex(0);
          console.log(audio.src);
          setPlaying();
        }
      } else {
        let x = audio;
        // console.log(x.src);
        x.play();
        setPlaying();
      }
    }

    // Change the state of song
  };

  const handleNext = () => {
    if (shuffleOn) handleShuffle();
    else {
      if (index === songs.length - 1) setIndex(0);
      else setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (shuffleOn) handleShuffle();
    else {
      if (index === 0) setIndex(songs.length - 1);
      else setIndex(index - 1);
    }
  };

  audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    handleNext();
  });
  console.log(audio.src);
  return (
    <div>
      <div className='bottom' style={{ cursor: 'pointer' }}>
        <input
          type='range'
          name='range'
          id='myProgressBar'
          min='0'
          value='0'
          max='100'
        />
        <div className='icons'>
          <button
            className={shuffleOn ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => {
              setShuffleOn(!shuffleOn);
            }}
          >
            Shuffle
          </button>
          <i
            className='fas fa-3x fa-step-backward'
            onClick={handlePrevious}
            id='previous'
          ></i>
          <i
            className={
              playing ? 'fas fa-3x fa-pause-circle' : 'fas fa-3x fa-play-circle'
            }
            onClick={handlePlayAndPause}
            id='masterPlay'
          ></i>
          <i
            className='fas fa-3x fa-step-forward'
            onClick={handleNext}
            id='next'
          ></i>
        </div>
      </div>
      <h5>{currentSong?.title}</h5>
      <h6>{currentSong?.subtitle}</h6>
    </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.play.songs,
  currentSong: state.play.currentSong,
  playing: state.play.playing,
  audio: state.play.audio,
  index: state.play.index,
  loading: state.play.loading,
});

MusicPlayer.propTypes = {
  setSongs: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
  setPlaying: PropTypes.func.isRequired,
  setNotPlaying: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  audio: PropTypes.object.isRequired,
  setAudio: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setCurrentSong,
  setSongs,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  setLoading,
})(MusicPlayer);
