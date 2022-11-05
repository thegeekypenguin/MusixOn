import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likeSong, getLikedSongs } from "../../actions/like";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  setCurrentSong,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  setLoading,
  setArtistId,
} from "../../actions/play";
import { addToPlaylist, deleteFromPlaylist } from "../../actions/playlist";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { deleteFromQueue, addToQueue } from "../../actions/queue";

const Song = ({
  songs,
  playing,
  setPlaying,
  setNotPlaying,
  currentSong,
  audio,
  setAudio,
  index,
  setIndex,
  setLoading,
  loading,
  artistId,
  setArtistId,
  addToPlaylist,
  playlistCheck,
  deleteFromPlaylist,
  addToQueue,
  deleteFromQueue,
  queueCheck,
  likeSong,
  getLikedSongs,
  likedSongs,
}) => {
  // const [audio, setAudio] = useState(new Audio());

  // useEffect(() => {
  //   if(!playing)
  //   audio.pause();
  //   audio.currentTime = 0;
  //   // setAudio();
  // }, []);

  const [titles, setTitles] = useState([]);

  useEffect(() => {
    audio.play();
    setLoading(false);
  }, [audio]);

  useEffect(() => {
    getLikedSongs();
  }, []);

  useEffect(() => {
    var array = new Array();
    for (var i = 0; i < likedSongs.length; i++) {
      array.push(likedSongs[i].title);
    }
    setTitles(array);
  }, [likedSongs]);

  async function handleClick(song) {
    if (!playing) {
      setLoading(true);
      setPlaying();
      setCurrentSong(song);
      setIndex(songs.indexOf(song));
      console.log(index);
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song?.title },
        headers: {
          "X-RapidAPI-Key":
            "841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1",
          "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
        },
      };
      try {
        const res = await axios.request(options);
        const id = res.data.result.songs[0].id;
        console.log(id);
        const options2 = {
          method: "GET",
          url: "https://youtube-music1.p.rapidapi.com/get_download_url",
          params: { id: id, ext: "mp3" },
          headers: {
            "X-RapidAPI-Key":
              "841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1",
            "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else if (currentSong?.title === song?.title) {
      setNotPlaying();
      audio.pause();
    } else {
      setLoading(true);
      setPlaying();
      audio.pause();
      audio.currentTime = 0;
      setCurrentSong(song);
      setIndex(songs.indexOf(song));
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song.title },
        headers: {
          "X-RapidAPI-Key":
            "841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1",
          "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
        },
      };
      try {
        const res = await axios.request(options);
        const id = res.data.result.songs[0].id;
        console.log(id);
        const options2 = {
          method: "GET",
          url: "https://youtube-music1.p.rapidapi.com/get_download_url",
          params: { id: id, ext: "mp3" },
          headers: {
            "X-RapidAPI-Key":
              "841dbc2911msh1827b6e51607720p13b93fjsn4313f055b1f1",
            "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const handleAddToPlaylist = (song) => {
    const { title, subtitle, images } = song;
    const image = images?.coverart;
    addToPlaylist({ title, subtitle, image });
    setAlert("Added to Playlist", "success");
  };

  const handleAddToQueue = (song) => {
    const { title, subtitle, images } = song;
    const image = images?.coverart;
    addToQueue({ title, subtitle, image });
    setAlert("Added to Queue", "success");
  };

  const handleLikeSong = (song) => {};

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200  table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  overflow-hidden truncate w-2 "
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Song
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  "
                    >
                      Singer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      buttons
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {songs.map((song, i) => (
                    <tr key={song.key}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td>
                        <div class="flex flex-row  ">
                          <div>
                            <img
                              alt="song_img"
                              src={
                                song?.images?.coverart
                                  ? song.images.coverart
                                  : song.image
                              }
                              className="w-30 h-20 rounded-lg"
                              onClick={() => handleClick(song)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div>
                            {" "}
                            <strong>{song.title}</strong>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
                        {song.subtitle}
                      </td>
                      <td>3min</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            !playlistCheck
                              ? handleAddToPlaylist(song)
                              : deleteFromPlaylist(song._id)
                          }
                        >
                          {playlistCheck
                            ? "Remove from playlist"
                            : "Add to playlist"}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            !queueCheck
                              ? handleAddToQueue(song)
                              : deleteFromQueue(song._id)
                          }
                        >
                          {queueCheck ? "Remove from queue" : "Add to queue"}
                        </button>
                        {titles}
                        <FavoriteBorderIcon
                          onClick={(e) => {
                            handleLikeSong(song);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.play.songs,
  playing: state.play.playing,
  currentSong: state.play.currentSong,
  audio: state.play.audio,
  index: state.play.index,
  loading: state.play.loading,
  artistId: state.play.artistId,
  playlistCheck: state.playlist.playlistCheck,
  queueCheck: state.queue.queueCheck,
  likedSongs: state.like.likedSongs,
});

Song.propTypes = {
  songs: PropTypes.array.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  currentSong: PropTypes.object,
  setAudio: PropTypes.func.isRequired,
  audio: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired,
  setArtistId: PropTypes.func.isRequired,
  deleteFromPlaylist: PropTypes.func.isRequired,
  playlistCheck: PropTypes.bool,
  queueCheck: PropTypes.bool,
  deleteFromQueue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setCurrentSong,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  setLoading,
  setArtistId,
  addToPlaylist,
  deleteFromPlaylist,
  addToQueue,
  deleteFromQueue,
  getLikedSongs,
  likeSong,
})(Song);
