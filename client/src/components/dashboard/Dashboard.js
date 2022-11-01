import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MusicPlayer from '../layout/MusicPlayer';
import { Link } from 'react-router-dom';
import Song from '../layout/Song';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentSong, setSongs } from '../../actions/play';
import axios from 'axios';
import Search from '../layout/Search';
import { setPlaylistCheck } from '../../actions/playlist';
import { loadQueue, deleteFromQueue } from '../../actions/queue';

const Dashboard = ({
  songs,
  setSongs,
  setPlaylistCheck,
  loadQueue,
  deleteFromQueue,
  queueSongs,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    loadQueue();
    setSongs(queueSongs);
  }, []);

  console.log(songs);
  console.log(queueSongs);

  return (
    <div>
      <Link to='/top-indian-songs'>
        <button className='btn btn-primary'>Top Indian Trending Songs</button>
      </Link>
      <br />
      <br />
      <Link to='/top-world-songs'>
        <button className='btn btn-primary'>Top World Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/POP'>
        <button className='btn btn-primary'>Top Pop Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/HIP_HOP_RAP'>
        <button className='btn btn-primary'>Top Hip hop Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/DANCE'>
        <button className='btn btn-primary'>Top Dance Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/ELECTRONIC'>
        <button className='btn btn-primary'>Top Electronic Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/SOUL_RNB'>
        <button className='btn btn-primary'>Top Soul Rnb Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/ALTERNATIVE'>
        <button className='btn btn-primary'>Top Alternative Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/ROCK'>
        <button className='btn btn-primary'>Top Rock Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/LATIN'>
        <button className='btn btn-primary'>Top Latin Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/FILM_TV'>
        <button className='btn btn-primary'>Top Film Tv Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/COUNTRY'>
        <button className='btn btn-primary'>Top Country Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/AFRO_BEATS'>
        <button className='btn btn-primary'>Top Afro Beats Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/WORLDWIDE'>
        <button className='btn btn-primary'>Top Worldwide Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/K_POP'>
        <button className='btn btn-primary'>Top K-Pop Songs</button>
      </Link>
      <br />
      <br />

      <Link to='/FRENCH_POP'>
        <button className='btn btn-primary'>Top French Pop Songs</button>
      </Link>

      <MusicPlayer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.play.songs,
  currentSong: state.play.currentSong,
  queueSongs: state.queue.queueSongs,
});

Dashboard.propTypes = {
  setSongs: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
};

export default connect(mapStateToProps, {
  setSongs,
  setCurrentSong,
  setPlaylistCheck,
  loadQueue,
  deleteFromQueue,
})(Dashboard);
