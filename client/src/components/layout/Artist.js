import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setArtist, setFollowCheck } from '../../actions/play';
import axios from 'axios';
import { setAlert } from '../../actions/alert';

const Artist = ({
  setArtist,
  artist,
  artistId,
  setFollowCheck,
  followCheck,
}) => {
  const [values, setValues] = useState({});
  console.log(artist.data);
  console.log(artist);

  const handleFollowArtist = async (artist) => {
    try {
      console.log(artist.data[0].attributes.name);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const name = artist.data[0].attributes?.name;
      const image = artist.data[0].attributes?.artwork.url;
      const body = JSON.stringify({
        name,
        image,
      });
      console.log(body);
      const res = await axios.post(
        `/api/followArtist/${artist.data[0].id}`,
        body,
        config
      );
      console.log(res);
      setAlert('Started following', 'success');
      setFollowCheck(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUnfollowArtist = async (artist) => {
    try {
      await axios.delete(`/api/followArtist/${artist.id}`);
      setAlert('Artist unfollowed', 'success');
      setFollowCheck(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div class='relative h-72 bg-white rounded-lg shadow-lg   mb-32'>
      <div class='absolute inset-0 rounded-lg overflow-hidden bg-[#263319]  '>
        <img
          src={artist.data[0].attributes?.artwork.url}
          alt=''
          className=' mx-auto '
        />
        <div class='absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black'></div>
      </div>

      <div class='absolute flex space-x-6 transform translate-x-6 translate-y-44'>
        <div class='w-36 h-36 rounded-lg shadow-lg overflow-hidden'>
          <img src={artist.data[0].attributes?.artwork.url} alt='' />
        </div>
        <div class='text-white pt-10'>
          <h3 class='font-bold text-3xl'>{artist.data[0].attributes?.name}</h3>
          <div class='text-sm opacity-60'>Artist</div>
          {!followCheck ? (
            <button
              className='btn btn-primary'
              onClick={(e) => handleFollowArtist(artist)}
            >
              Follow
            </button>
          ) : (
            <button
              className='btn btn-primary'
              onClick={(e) => handleUnfollowArtist(artist.data[0])}
            >
              Unfollow
            </button>
          )}

          <div class='mt-6 text-gray-400'>
            <div class='flex items-center space-x-2 text-xs'>
              <svg
                class='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path d='M3 18v-6a9 9 0 0 1 18 0v6'></path>
                <path d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z'></path>
              </svg>
              <span>Enjoy listening</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
  setArtist: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  artist: state.play.artist,
  artistId: state.play.artistId,
  followCheck: state.play.followCheck,
});

export default connect(mapStateToProps, { setArtist, setFollowCheck })(Artist);
