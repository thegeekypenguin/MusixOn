import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setArtist } from '../../actions/play';

const Artist = ({ setArtist, artist, artistId }) => {
  console.log('From Artist.js', artist);

  return (
    <div>
      <img
        src={artist?.data[0]?.attributes?.artwork?.url}
        // style={{ width: '300', height: '300' }}
      />
      <h1 class='font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600'>
        {artist?.data[0]?.attributes?.name}
      </h1>
      <p>{artist?.data[0]?.attributes?.artistBio.replace(/<[^>]+>/g, '')}</p>
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
});

export default connect(mapStateToProps, { setArtist })(Artist);
