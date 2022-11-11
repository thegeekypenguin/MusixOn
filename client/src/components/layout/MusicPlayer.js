import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import {
  deleteFromHistory,
  addCurrentSongInHistory,
} from "../../actions/history";

import "./style.css";
import {
  TbArrowsShuffle2,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbVolume,
  TbPlayerTrackNext,
  TbPlayerTrackPrev,
  TbRepeat,
  TbVolume3,
  TbDownload,
} from "react-icons/tb";

import { BsMusicNoteBeamed } from "react-icons/bs";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import {CgPlayListCheck,CgPlayListAdd}  from "react-icons/cg"

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
import { likeSong, getLikedSongs, unlikeSong } from "../../actions/like";

import "https://kit.fontawesome.com/26504e4a1f.js";

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
import { HiQueueList, HiOutlineQueueList } from "react-icons/hi2";

import { Navigate, useNavigate } from "react-router-dom";
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
  title,
  subtitle,
  image,
  historyCheck,
  deleteFromHistory,
  addCurrentSongInHistory,
  likeSong, getLikedSongs, unlikeSong ,likedSongs
}) => {
  const [open, setOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  const [titles, setTitles] = useState([]);
  const [songId, setSongId] = useState("");

  const secondsToMinutes = (sec) => {
    if (!sec) return "00:00";
    sec = Math.trunc(+sec);
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;

    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  };

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
    if (queueSongs.length > 0) {
      var array = new Array();
      for (var i = 0; i < queueSongs.length; i++)
        array.push(queueSongs[i].title);
      setTitles(array);
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
      // setNotPlaying();
      setLoading(true);
      // await setCurrentSong(songsList[index]);
      const { title, subtitle, images } = songsList[index];
      const image = images?.coverart;
      setCurrentSong({ title, subtitle, image });
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: songsList[index]?.title },
        headers: {
          "X-RapidAPI-Key":
            "14c05f9d39msh620bb14ad7e9531p102005jsna39efb78a39b",
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
              "efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
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

  useEffect(() => {
    if (playing) audio.play();
    setLoading(false);
  }, [audio]);


  const handleLikeSong = async (song) => {
    const { title, subtitle, images } = song;
    const image = images?.coverart;
    await likeSong({ title, subtitle, image });
    console.log("From handle like");
    setAlert("Added to Liked songs", "success");
    getLikedSongs();
  };

  const handleUnlikeSong = async (song) => {
    await unlikeSong(song.title);
    getLikedSongs();
    setAlert("Removed from Liked songs", "success");
  };

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

  const handleNext = async () => {
    // console.log(songId);
    console.log(titles);
    console.log(index);
    console.log(title);
    if (shuffleOn) handleShuffle();
    else {
      if (queueSongs.length > 0) {
        // if (titles.includes(title)) {
        var i = titles.indexOf(title);
        deleteFromQueue(songsList[i]._id);
        i++;
        alert(i);
        setIndex(i);
        } else {
          setIndex(0);
      }
      //  else if (index >= songsList.length - 1) setIndex(0);
      // else setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (shuffleOn) handleShuffle();
    else {
      if (index === 0) setIndex(songsList.length - 1);
      else setIndex(index - 1);
    }
  };
  const handleFastForward = () => {
    audio.currentTime += 10;
  };
  const handleRewind = () => {
    if (audio.currentTime >= 10) {
      audio.currentTime -= 10;
    } else {
      audio.currentTime = 0;
    }
  };

  audio?.addEventListener("ended", function () {
    audio.currentTime = 0;
    if (repeatOn) {
      audio.play();
    } else handleNext();
  });

  const [volume, setVolume] = useState(1);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const [currentSongTime, setCurrentSongTime] = useState(0);
  const myProgressBar = document.getElementById("myProgressBar");
  audio?.addEventListener("timeupdate", () => {
    // console.log("time is updating")
    // var val = audio.duration;
    setCurrentSongTime(audio.currentTime);
    // const progress = parseInt((audio.currentTime / audio.duration) * 100);
    // myProgressBar.value = audio.currentTime;
  });

  // myProgressBar?.addEventListener("change", () => {
  //   audio.currentTime = (myProgressBar.value * audio.duration) / 100;
  // });

  // to display queue songs on every page we are loading the queuesongs and displaying them in the musicplayer

  const navigate = useNavigate();
  async function handleClick(song) {
    if (!playing) {
      setLoading(true);

      setPlaying();
      console.log(currentSong);
      const { title, subtitle, images } = song;

      const image = images?.coverart;
      console.log(image);
      if (historyCheck) {
        deleteFromHistory(song.id);
      }
      setCurrentSong({ title, subtitle, image });
      addCurrentSongInHistory({ title, subtitle, image });
      setIndex(songsList.indexOf(song));
      if (titles.includes(title)) {
        const { _id } = song;
        // deleteFromQueue(songId);
        setSongId(_id);
        console.log("deleted");
      }
      // setCurrentSong(song);

      console.log(index);
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song?.title },
        headers: {
          "X-RapidAPI-Key":
            "efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
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
              "efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
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
      // setCurrentSong(song);
      const { title, subtitle, images } = song;

      const image = images?.coverart;
      console.log(image);
      if (historyCheck) {
        deleteFromHistory(song.id);
      }
      setCurrentSong({ title, subtitle, image });
      addCurrentSongInHistory({ title, subtitle, image });
      setIndex(songsList.indexOf(song));
      if (titles.includes(title)) {
        const { _id } = song;
        // deleteFromQueue(songId);
        setSongId(_id);
        console.log("deleted");
      }
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song.title },
        headers: {
          "X-RapidAPI-Key":
            "efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
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
              "efc42382bfmsh8a8358b837d16cap12b2afjsn340a9149fd2e",
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

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      {/*        
        <div class="absolute inset-y-0 right-0 w-16 ...">0fhgfhg6</div>
    */}

      <Queue />
 

      <div className="fixed w-screen bottom-0 inset-x-0 ">
        <div className="py-3 bg-neutral-800/60 backdrop-blur-xl rounded-t-[2rem] text-white shadow-lg shadow-purple-50">
          <div className="container mx-auto px-3 lg:px-0 flex justify-between">
            {/* title and thumbnail clicking on this will open the song Lyrics*/}
            <button
              onClick={() => {
                navigate("/songLyrics");
              }}
            >
              {/* lg:w-6/12 gap-2 */}

              <div className="flex items-center ">
                {image ? (
                  <div className="w-14 h-14 lg:flex-shrink-0">
                    <img src={image} alt="img" className="rounded-lg" />
                  </div>
                ) : (
                  <div className="">
                    <BsMusicNoteBeamed size={25} className="my-auto" />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <h6 className="text-sm font-semibold">
                    {title ? title : ""}
                  </h6>
                  <span className="text-xs text-gray-400">
                    {" "}
                    {subtitle ? subtitle : ""}
                  </span>
                </div>
              </div>
            </button>

            <button type="button" onClick={() => setShowModal(true)}>
              <HiQueueList size={20} />
            </button>

            {/* play/pause and next/prev icons */}

            <div className="flex items-center justify-center gap-3 lg:w-2/12">
            

              <button onClick={handleRewind}>
                <TbPlayerTrackPrev size={20} />
              </button>
              {loading ? (
                <div class="flex justify-center items-center">
                  <div
                    class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  >
                    <span class="visually-hidden"> </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handlePlayAndPause}
                  id="masterPlay"
                  className="rounded-full p-1 border border-black"
                >
                  {playing ? (
                    <TbPlayerPause size={26} />
                  ) : (
                    <TbPlayerPlay size={26} />
                  )}
                </button>
              )}

              <button onClick={handleFastForward}>
                <TbPlayerTrackNext size={20} />
              </button>
              <button onClick={handleNext} id="next">
                <TbPlayerSkipForward size={20} />
              </button>
            </div>
            {/* progress */}
            <div className="hidden lg:flex w-6/12 flex-col gap-1 justify-center">
              <div style={{ cursor: "pointer" }}>
                <Slider
                  trackStyle={{ background: "#081A51" }}
                  handleStyle={{
                    border: "2px solid #081A51",
                    background: "#081A51",
                    boxShadow: "none",
                    opacity: 1,
                  }}
                  min={0}
                  max={200}
                  value={currentSongTime}
                  onChange={(value) => {
                    audio.currentTime = value;
                  }}
                  id="myProgressBar"
                />
              </div>
              <div className="flex justify-between text-xs">
                <span>{secondsToMinutes(currentSongTime)}</span>
                <span>{secondsToMinutes(200)}</span>
              </div>
            </div>
            {/* settings */}

            <div className="flex justify-between lg:w-1/12">
              <button class="mx-1.5">
                <TbRepeat size={20}></TbRepeat>
              </button>
              <button class="mx-1.5">
                <TbArrowsShuffle2 size={20} />
              </button>
              <div className="relative flex items-center h-full mx-2">
                {isVolumeOpen && (
                  <div className="flex absolute -top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg w-8 h-20 rounded-2xl overflow-hidden bg-neutral-800/60 py-4 justify-center">
                    <Slider
                      vertical
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(val) => {
                        console.log(volume);
                        audio.volume = val;
                        setVolume(val);
                      }}
                      trackStyle={{ background: "#081A51" }}
                      handleStyle={{
                        background: "#081A51",
                        border: "2px solid #081A51",
                      }}
                    />
                  </div>
                )}

                <button onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
                  {volume === 0 ? (
                    <TbVolume3 size={20} />
                  ) : (
                    <TbVolume size={20} />
                  )}
                </button>
              </div>
              {/* <button class="mx-1.5">
                <TbDownload size={20} />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Queue</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  {/* Displaying the queueSongs */}
                  <ul class="text-xs sm:text-base divide-y border-t cursor-default">
                    {queueSongs.map((song, i) => (
                      <li class="flex items-center space-x-3 hover:bg-gray-100 mr-5">
                       
                        {/* <div class="flex">{i + 1}</div> */}

                        <div className="flex">
                          <img
                            alt="song_img"
                            src={song?.images?.coverart}
                            className="w-30 h-20 rounded-lg"
                            onClick={() => handleClick(song)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div class="flex-1">
                          <div>
                            <strong>{song.title}</strong>
                          </div>
                          <div> {song.subtitle}</div>
                        </div>
                        {/* <div class="text-xs text-gray-400">3:20</div> */}

                        {likedSongs.includes(song) ? (
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              handleUnlikeSong(song);
                            }}
                          >
                            <FcLike size={25} />
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              handleLikeSong(song);
                            }}
                          >
                            <FcLikePlaceholder size={25} />
                          </button>
                        )}
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            !playlistCheck
                              ? handleAddToPlaylist(song)
                              : deleteFromPlaylist(song._id)
                          }
                        >
                          {playlistCheck ? (
                            <CgPlayListCheck size={25} />
                          ) : (
                            <CgPlayListAdd size={25} />
                          )}
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            !queueCheck
                              ? handleAddToQueue(song)
                              :deleteFromQueue(song._id)
                          }
                        >
                          
                            <HiQueueList size={25} />
                         
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
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
  title: state.play.title,
  subtitle: state.play.subtitle,
  image: state.play.image,
  historyCheck: state.history.historyCheck,
  likedSongs: state.like.likedSongs,

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
  deleteFromHistory,
  addCurrentSongInHistory,
  getLikedSongs,
  unlikeSong,
})(MusicPlayer);
