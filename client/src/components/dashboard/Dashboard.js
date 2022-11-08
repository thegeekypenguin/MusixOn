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
import { genres } from "../layout/constants/GenreConstants";


const Dashboard = ({
  songs,
  setSongs,
  setPlaylistCheck,
  loadQueue,
  deleteFromQueue,
  queueSongs,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   loadQueue();
  //   // setSongs(queueSongs);
  // }, []);

  // console.log(songs);
  // console.log(queueSongs);

  return (
    <div>
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <div className="flex flex-wrap sm:justify-start justify-center gap-4">
      {genres.map((genre, i) => (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
          <Link to={genre.link}>
            <div className="relative w-full h-56 group">
              <div
                className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex`}
              ></div>
              <div>
                <img
                  alt="genre_img"
                  src={genre.image}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col">
              <p className="font-semibold text-lg text-black truncate">
                {genre.title}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
    <div>
 
    </div>
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
