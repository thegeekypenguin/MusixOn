import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import './style.css';
import 'https://kit.fontawesome.com/26504e4a1f.js';
import song1 from './songs/Kesariya.mp3';
import song2 from './songs/Saiyyan.mp3';
import song3 from './songs/Samjhawan.mp3';
import songslist from '../../songs.json';
import Song from './Song';

const MusicPlayer = (props) => {
  // const songs = [song1, song2, song3];

  const songs = [
    'https://cdn.discordapp.com/attachments/775740994595323954/775741536591806484/Alan_Walker_-_Fade_NCS_ReleaseMP3_160K.mp3',
    'https://cdn.discordapp.com/attachments/775740994595323954/775741544149549096/Andromedik_-_SHE_NCS_ReleaseMP3_160K.mp3',
    'https://cdn.discordapp.com/attachments/775740994595323954/775741547203002389/Ascence_-_About_You_NCS_ReleaseMP3_160K.mp3',
  ];

  const [isPlaying, setPlay] = useState(false);
  const [index, setIndex] = useState(0);
  const [audio, setAudio] = useState(
    new Audio('/src/components/layout/songs/Deva Deva.mp3')
  );

  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
    setAudio(new Audio(songs[index]));
  }, [index]);

  useEffect(() => {
    if (isPlaying) audio.play();
  }, [audio]);

  const handlePlayAndPause = () => {
    if (isPlaying) {
      // Pause the song if it is playing
      let x = audio;
      x.pause();
      setAudio(x);
    } else {
      // Play the song if it is paused
      let x = audio;
      x.play();
      setAudio(x);
    }

    // Change the state of song
    setPlay(!isPlaying);
  };

  const handleNext = () => {
    if (index === songs.length - 1) setIndex(0);
    else setIndex(index + 1);
  };

  const handlePrevious = () => {
    if (index === 0) setIndex(songs.length - 1);
    else setIndex(index - 1);
  };

  const handleShuffle = () => {
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
    for (var i = 0; i < songs.length; i++) setIndex(array[i]);
    console.log(array);
  };

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
        <div class='icons'>
          <button className='btn btn-danger' onClick={handleShuffle}>
            Shuffle
          </button>
          <i
            className='fas fa-3x fa-step-backward'
            onClick={handlePrevious}
            id='previous'
          ></i>
          <i
            className={
              isPlaying
                ? 'fas fa-3x fa-pause-circle'
                : 'fas fa-3x fa-play-circle'
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
      <Row>
        {songslist.map((song) => (
          <Col key={song.id} sm={12} md={6} lg={4} xl={3}>
            <Song song={song} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

MusicPlayer.propTypes = {};

export default MusicPlayer;