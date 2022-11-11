import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Card } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { setArtist, setFollowCheck } from "../../actions/play";
import { useNavigate } from "react-router-dom";

const AritstsFollowed = ({ setArtist, setFollowCheck }) => {
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);

  const handleArtistClick = async (id) => {
    const options = {
      method: "GET",
      url: "https://shazam-core.p.rapidapi.com/v2/artists/details",
      params: { artist_id: id },
      headers: {
        "X-RapidAPI-Key":
          "  d64082b894mshea4b72f597ca98cp1a3f67jsncc372fa04065",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    try {
      const res = await axios.request(options);
      setArtist(res.data);
      console.log("Result", res);
      setFollowCheck(true);

      navigate("/artist");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    async function call() {
      try {
        const res = await axios.get("/api/followArtist");
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
      {" "}
      <div class="relative h-80 bg-white rounded-lg shadow-lg   mb-4">
        <div class="absolute inset-0 rounded-lg overflow-hidden bg-[#263319]  ">
          <img
            src="./assets/artist-bg.jpg"
            alt=""
            className=" mx-auto h-80 "
          />
        </div>
        <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>

        <div class="absolute flex space-x-6 transform translate-x-6 translate-y-48">
          <div class="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
            <img
              src="./assets/artist-bg.jpg"
              alt="My playlist"
              className="h-40 w-40"
            />
            <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-red"></div>
          </div>

          <div class="text-white pt-10">
            {/* <h3 class="font-bold text-3xl">{values.attributes?.name}</h3> */}
            <h3 class="font-bold text-3xl opacity-60">Followed Artists</h3>

            <div class="mt-6 text-gray-400">
              <div class="flex  space-x-2 text-xs">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {artists.map((artist) => {
          console.log(artist.id);
          return (
            <Col key={artist.id} sm={12} md={6} lg={4} xl={3}>
              <Card
                className="my-3 p-3 rounded"
                style={{ cursor: "pointer" }}
                key={artist.id}
                onClick={() => {
                  handleArtistClick(artist.id);
                }}
              >
                <Card.Img
                  //   className={playing ? 'bg-secondary' : 'bg-primary'}
                  src={artist.image}
                  style={{ height: "15vw", objectFit: "cover" }}
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
    </div>
  );
};

AritstsFollowed.propTypes = {};

export default connect(null, { setArtist, setFollowCheck })(AritstsFollowed);
