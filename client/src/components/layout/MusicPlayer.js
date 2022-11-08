import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "https://kit.fontawesome.com/26504e4a1f.js";

import songslist from "../../songs.json";
import Song from "./Song";
import { lazy } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { deleteFromQueue, addToQueue } from "../../actions/queue";
import Queue from "../layout/Queue";
import { setAlert } from "../../actions/alert";

import { addToPlaylist, deleteFromPlaylist } from "../../actions/playlist";
import {
  setCurrentSong,
  setNotPlaying,
  setPlaying,
  setSongs,
  setAudio,
  setArtistId,
  setIndex,
  setLoading,
} from "../../actions/play";

const MusicPlayer = ({
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
  playing,
  setNotPlaying,
  setPlaying,
  audio,
  setAudio,
  index,
  setIndex,
  setLoading,
  loading,
  queueSongs,
  deleteFromQueue,
  artistId,
  playlistCheck,
  queueCheck,
  addToQueue,
  addToPlaylist,
  deleteFromPlaylist,
  setArtistId,
  setAlert,
}) => {
  const [open, setOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  // const [index, setIndex] = useState(0);
  // const [audio, setAudio] = useState(new Audio(song2));

  const [songsList, setSongsList] = useState([]);

  const [shuffleOn, setShuffleOn] = useState(false);
  const [randomArray, setRandomArray] = useState([]);
  const [counter, setCounter] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);

  function handleShuffle() {
    if (counter < randomArray.length) {
      setIndex(randomArray[counter]);
      setCounter(counter + 1);
    } else {
      setIndex(randomArray[0]);
      setCounter(0);
    }
  }

  useEffect(() => {
    console.log("useEffect");
    console.log(queueSongs);
    console.log(songs);
    if (queueSongs.length > 0) {
      setSongsList(queueSongs);
    } else {
      setSongsList(songs);
    }
  }, [queueSongs]);

  useEffect(() => {
    if (shuffleOn) {
      var array = new Array();
      for (var i = 0; i < songsList.length; i++) array.push(i);
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      setRandomArray(array);
      if (!playing) handleShuffle();
    }
  }, [shuffleOn]);

  useEffect(() => {
    async function call() {
      audio.pause();
      audio.currentTime = 0;
      setNotPlaying();
      setLoading(true);
      setCurrentSong(songsList[index]);
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: songsList[index]?.title },
        headers: {
          "X-RapidAPI-Key":
            "2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d",
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
              "2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d",
            "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);
          setPlaying();
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    call();
  }, [index]);

  // useEffect(() => {
  //   if (playing) audio.play();
  //   setLoading(false);
  // }, [audio]);

  const handlePlayAndPause = () => {
    if (playing) {
      // Pause the song if it is playing
      let x = audio;
      x.pause();
      setNotPlaying();
    } else {
      // // Play the song if it is paused
      // if (audio.src === 'http://localhost:3000/dashboard') {
      //   if (shuffleOn) {
      //     handleShuffle();
      //   }
      //    else {
      //     setIndex(0);
      //     console.log(audio.src);
      //     setPlaying();
      //   }
      // }
      //  else {
      let x = audio;
      // console.log(x.src);
      x.play();
      setPlaying();
    }

    // Change the state of song
  };

  const handleNext = () => {
    if (shuffleOn) handleShuffle();
    else {
      if (queueSongs.length > 0) {
        if (queueSongs.includes(currentSong)) {
          deleteFromQueue(currentSong?._id);
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      } else if (index >= songsList.length - 1) setIndex(0);
      else setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (shuffleOn) handleShuffle();
    else {
      if (index === 0) setIndex(songsList.length - 1);
      else setIndex(index - 1);
    }
  };

  audio?.addEventListener("ended", function () {
    audio.currentTime = 0;
    if (repeatOn) {
      audio.play();
    } else handleNext();
  });

  const myProgressBar = document.getElementById("myProgressBar");
  audio?.addEventListener("timeupdate", () => {
    var val = audio.duration;
    const progress = parseInt((audio.currentTime / audio.duration) * 100);
    myProgressBar.value = audio.currentTime;
  });

  myProgressBar?.addEventListener("change", () => {
    audio.currentTime = (myProgressBar.value * audio.duration) / 100;
  });

  // to display queue songs on every page we are loading the queuesongs and displaying them in the musicplayer

  useEffect(() => {
    audio.play();
    setLoading(false);
  }, [audio]);

  async function handleClick(song) {
    if (!playing) {
      setLoading(true);
      setPlaying();
      console.log(currentSong);
      if (currentSong && queueSongs.includes(currentSong)) {
        deleteFromQueue(currentSong._id);
        console.log("deleted");
      }
      setCurrentSong(song);
      setIndex(songsList.indexOf(song));
      console.log(index);
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song?.title },
        headers: {
          "X-RapidAPI-Key":
            "2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d",
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
              "2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d",
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
      setIndex(queueSongs.indexOf(song));
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song.title },
        headers: {
          "X-RapidAPI-Key":
            "2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d",
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
              "2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d",
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
    deleteFromQueue(currentSong._id);
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

  return (
    <div>
      {console.log("Queue")}
      <Queue />
      {/* Displaying the queueSongs */}
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
                  {queueSongs.map((song, i) => (
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
                        <FavoriteBorderIcon />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
{/* 
      <div className="absolute h-screen inset-y-0 right-0 w-16  sticky ">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src=" /assets/control.png"
            className={`absolute cursor-pointer -left-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            alt="assets"
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="/assets/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
              alt="logo"
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              MusixOn
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <img src={`/assets/${Menu.src}.png`} alt="type" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/*displaying player*/}

      <div className="bottom" style={{ cursor: "pointer" }}>
        <input
          type="range"
          name="range"
          id="myProgressBar"
          min="0"
          value="0"
          max="200"
        />
        <div className="icons">
          <button
            className={shuffleOn ? "btn btn-primary" : "btn btn-secondary"}
            onClick={() => {
              setShuffleOn(!shuffleOn);
            }}
          >
            Shuffle
          </button>
          <button
            className={repeatOn ? "btn btn-primary" : "btn btn-secondary"}
            onClick={() => {
              setRepeatOn(!repeatOn);
            }}
          >
            Repeat
          </button>
          <i
            className="fas fa-3x fa-step-backward"
            onClick={handlePrevious}
            id="previous"
          ></i>
          <i
            className={
              playing ? "fas fa-3x fa-pause-circle" : "fas fa-3x fa-play-circle"
            }
            onClick={handlePlayAndPause}
            id="masterPlay"
          ></i>
          <i
            className="fas fa-3x fa-step-forward"
            onClick={handleNext}
            id="next"
          ></i>
        </div>
      </div>
      <h5>{currentSong?.title}</h5>
      <h6>{currentSong?.subtitle}</h6>
    </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.play.songs,
  currentSong: state.play.currentSong,
  playing: state.play.playing,
  audio: state.play.audio,
  index: state.play.index,
  loading: state.play.loading,
  queueSongs: state.queue.queueSongs,
  artistId: state.play.artistId,
  playlistCheck: state.playlist.playlistCheck,
  queueCheck: state.queue.queueCheck,
});

MusicPlayer.propTypes = {
  setSongs: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
  setPlaying: PropTypes.func.isRequired,
  setNotPlaying: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  audio: PropTypes.object.isRequired,
  setAudio: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  queueSongs: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  setCurrentSong,
  setSongs,
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
})(MusicPlayer);
