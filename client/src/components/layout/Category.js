import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MusicPlayer from './MusicPlayer';
import Song from './Song';
import { connect } from 'react-redux';
import { setSongs } from '../../actions/play';
import { setPlaylistCheck } from '../../actions/playlist';
import { setQueueCheck } from '../../actions/queue';

const Category = ({ setSongs, setPlaylistCheck, setQueueCheck }) => {
  const [categoryTitle,setCategoryTitle]=useState("Songs")
  useEffect(() => {
    async function call() {
      var q = window.location.pathname.slice(1);
      setCategoryTitle(q.split('-').join(' ').toUpperCase())
      // alert(categoryTitle)
      // const options = {};
      if (q === 'top-indian-songs') {
        const options = {
          method: 'GET',
          url: 'https://shazam-core.p.rapidapi.com/v1/charts/country',
          params: { country_code: 'IN' },
          headers: {
            "X-RapidAPI-Key":
              "  efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
            "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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
            "X-RapidAPI-Key":
              "  efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
            "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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
            "X-RapidAPI-Key":
              "  efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
            "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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
    <div class='min-h-screen bg-gray-100  '>
      {/* <div class="relative   w-full h-44 bg-white rounded-lg shadow-lg overflow-hidde mb-32">
        <div class="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
          <img
            src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=200&q=80"
            alt=""
          />
          <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
        </div>
        <div class="absolute flex space-x-6 transform translate-x-6 translate-y-14">
          <div class="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt=""
            />
          </div>
          <div class="text-white pt-12">
            <h3 class="font-bold">Album</h3>
            <div class="text-sm opacity-60">Super Interpret</div>
            <div class="mt-8 text-gray-400">
              <div class="flex items-center space-x-2 text-xs">
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
                <span>Easy listening</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div class='  bg-white rounded-lg shadow-lg overflow-hidden '>
        <div class='relative'>
          <img
            src="https://img.freepik.com/premium-photo/classic-sheets-with-music-notes-sign_488220-9925.jpg?w=2000"
            class="object-cover h-80  w-full"
            alt="img"
          />
          <div class='absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white'>
            <h3 class='font-bold text-3xl'>{categoryTitle}</h3>

        
          </div>
        </div>

        <Song />
      </div>
    </div>
  );
};

Category.propTypes = {};

export default connect(null, { setPlaylistCheck, setQueueCheck, setSongs })(
  Category
);

// <div>
// <header
//   className="header-main"
//   style={{
//     background:
//       ' no-repeat center/cover url("https://img.freepik.com/premium-photo/classic-sheets-with-music-notes-sign_488220-9925.jpg?w=2000")',
//     height: "30vw",
//     position: "relative",
//     objectFit: "contain",
//   }}
// > </header>
// <Song />
// </div>
