import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { setArtist, setFollowCheck } from '../../actions/play';
import { useNavigate } from 'react-router-dom';

const AritstsFollowed = ({ setArtist, setFollowCheck }) => {
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);

  const handleArtistClick = async (id) => {
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v2/artists/details',
      params: { artist_id: id },
      headers: {
        'X-RapidAPI-Key':
          '  d64082b894mshea4b72f597ca98cp1a3f67jsncc372fa04065',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    };
    try {
      const res = await axios.request(options);
      setArtist(res.data);
      console.log('Result', res);
      setFollowCheck(true);

      navigate('/artist');
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get('/api/followArtist');
        console.log(res.data);
        setArtists(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, []);

  return (
    <div>
      {artists.map((artist) => {
        console.log(artist.id);
        return (
          <Col key={artist.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              className='my-3 p-3 rounded'
              style={{ cursor: 'pointer' }}
              key={artist.id}
              onClick={() => {
                handleArtistClick(artist.id);
              }}
            >
              <Card.Img
                //   className={playing ? 'bg-secondary' : 'bg-primary'}
                src={artist.image}
                style={{ height: '15vw', objectFit: 'cover' }}
              />

              <Card.Body>
                <Card.Title>
                  <strong>{artist.name}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </div>
  );
};

AritstsFollowed.propTypes = {};

export default connect(null, { setArtist, setFollowCheck })(AritstsFollowed);
