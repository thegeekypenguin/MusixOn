import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setCurrentSong,
  setSongs,
  setArtist,
  setArtistId,
  setFollowCheck,
} from '../../actions/play';
import axios from 'axios';
import MusicPlayer from './MusicPlayer';
import Song from './Song';
import { Row, Col, Card } from 'react-bootstrap';

const Search = ({
  songs,
  setSongs,
  artist,
  setArtist,
  setArtistId,
  setFollowCheck,
}) => {
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
            'efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e',
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
        'X-RapidAPI-Key': 'efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    };
    try {
      const res = await axios.request(options);
      setArtist(res.data);
      console.log('Result', res);
      try {
        const data = await axios.get(`/api/followArtist/${id}`);
        console.log(data);
        if (data.data) {
          setFollowCheck(true);
        }
      } catch (err) {
        console.log(err.message);
      }

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
        'X-RapidAPI-Key': 'efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e',
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
    <div class="max-w-md mx-auto mt-5">
      <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-800 overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={(e) =>
              handleClick(document.getElementById("search_bar").value)
            }
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search_bar"
          class="peer h-full w-full outline-none text-sm text-gray-50 bg-slate-800 pr-2"
          placeholder="Search favourite Song or Artist .."
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
    </div>
    {/**search bar finished  */}
    {tempSearch?.map((i) => {
      const name = i.term;
      return (
        <div class="my-4 space-y-3"
          id="box"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleClick(i.term);
          }}
        >
          {/* <h1>{i.term}</h1> */}
          <h3 class="mb-4 mx-80 text-xs font-extrabold tracking-tight leading-none text-zinc-900 md:text-xl lg:text-xl dark:text-black"><span class="text-black-600 dark:text-black-500">{i.term}</span></h3>
          {/* <div>
                <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="flex-1 ml-3 whitespace-nowrap">{i.term}</span>
                </a>
          </div> */}
        </div>
      );
    })}
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Tracks</span></h1>
    <Song />
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Artists</span></h1>

    <div className="flex flex-wrap sm:justify-start justify-center gap-4 mx-10">
      {searchArtists?.hits?.map((artist) => (
        <div
          class="w-72 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-neutral-800 dark:bg-neutral-800"
          key={artist?.artist?.adamid}
        >
          <div
            class="flex flex-col items-center pb-8"
            style={{ cursor: "pointer" }}
            key={artist.key}
            onClick={() => {
              handleArtistClick(artist.artist.adamid);
            }}
          >
            <img
              class="mb-1 mt-3 w-28 h-28 rounded-full shadow-lg"
              src={artist?.artist?.avatar}
              alt="Bonnie image"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {artist?.artist?.name}
            </h5>
            
          </div>
        </div>
      ))}
    </div>
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
  setFollowCheck,
})(Search);
