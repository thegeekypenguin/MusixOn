import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setArtist } from '../../actions/play';

const Artist = ({ setArtist, artist, artistId }) => {
  const [values, setValues] = useState({});
  console.log(artist.artists);
  useEffect(() => {
    let x = Object.values(artist.artists);
    setValues(x[0]);
  }, []);

  return (
    <div>
      <img
        src={values.attributes?.artwork.url}
        // style={{ width: '300', height: '300' }}
      />
      <h4>{values.attributes?.name}</h4>
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
