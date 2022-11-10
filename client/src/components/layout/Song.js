import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likeSong, getLikedSongs, unlikeSong } from "../../actions/like";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  addCurrentSongInHistory,
  deleteFromHistory,
} from "../../actions/history";

import {
  setCurrentSong,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  setLoading,
  setArtistId,
} from "../../actions/play";

import { FcLikePlaceholder,FcLike } from "react-icons/fc";

import { addToPlaylist, deleteFromPlaylist } from "../../actions/playlist";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { deleteFromQueue, addToQueue } from "../../actions/queue";
import { useNavigate } from "react-router-dom";

const Song = ({
  songs,
  setCurrentSong,
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
  addCurrentSongInHistory,
  deleteFromHistory,
  historyCheck,
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
  unlikeSong,
}) => {
  // const [audio, setAudio] = useState(new Audio());

  // useEffect(() => {
  //   if(!playing)
  //   audio.pause();
  //   audio.currentTime = 0;
  //   // setAudio();
  // }, []);

  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const navigate = useNavigate();
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
      // setCurrentSong(song);
      console.log("debugg", currentSong);
      //add it in history

      // console.log("-----------------------------------------------");
      // console.log("Song Data");
      // console.log(song);

      // setTitle(title)
      // setSubtitle(subtitle)
      // setImage(images.coverart);
      const { title, subtitle, images } = song;
      setTitle(title);
      setSubtitle(subtitle);
      setImage(images.coverart);
      const image = images?.coverart;
      // setCurrentSong({ title, subtitle, image });
      console.log(images);
      console.log(image);
      if (historyCheck) {
        deleteFromHistory(song.id);
      }
      setCurrentSong({ title, subtitle, image });
      addCurrentSongInHistory({ title, subtitle,  image });
      // console.log("---------------Debug----------")
      // console.log(song);
      // console.log(currentSong)

      setAlert("Added in the history", "success");

      setIndex(songs.indexOf(song));
      console.log(index);
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song?.title },
        headers: {
          "X-RapidAPI-Key":
            "2f489e742emsh60346052aadd1b0p18936ejsn2e018d009227",
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
              "2f489e742emsh60346052aadd1b0p18936ejsn2e018d009227",
            "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);
          //setting deownload url
          setDownloadUrl(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else if (title === song?.title) {

       
      // setNotPlaying();
      audio.pause();
    } else {
      setLoading(true);
      setPlaying();
      audio.pause();
      audio.currentTime = 0;
      const { title, subtitle, images } = song;

      console.log(images);
      const image = images?.coverart;
      console.log(image);
      if (historyCheck) {
        deleteFromHistory(song.id);
      }
      setCurrentSong({ title, subtitle, image });
      addCurrentSongInHistory({ title, subtitle, image });
      setIndex(songs.indexOf(song));
      const options = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: song.title },
        headers: {
          "X-RapidAPI-Key":
            "2f489e742emsh60346052aadd1b0p18936ejsn2e018d009227",
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
              "2f489e742emsh60346052aadd1b0p18936ejsn2e018d009227",
            "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
          },
        };
        try {
          const res2 = await axios.request(options2);
          console.log(res2.data.result.download_url);

          setDownloadUrl(res2.data.result.download_url);
          setAudio(res2.data.result.download_url);

          //setting download url
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  console.log(currentSong);

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

  return (
    <ul class='text-xs sm:text-base divide-y border-t cursor-default'>
      {songs.map((song, i) => (
        <li class='flex items-center space-x-3 hover:bg-gray-100'>
          <button class='p-3 hover:bg-green-500 group focus:outline-none'>
            <svg
              class='w-4 h-4 group-hover:text-white'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <polygon points='5 3 19 12 5 21 5 3'></polygon>
            </svg>
          </button>
          {/* <div class="flex">{i + 1}</div> */}

          <div className='flex'>
            <img
              alt='song_img'
              src={
                song?.images?.coverart
                  
              }
              className='w-30 h-20 rounded-lg'
              onClick={() => handleClick(song)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div class='flex-1'>
            <div>
              <strong>{song.title}</strong>
            </div>
            <div> {song.subtitle}</div>
          </div>
          {/* <div class="text-xs text-gray-400">3:20</div> */}
          {/*      
          <button class="focus:outline-none pr-4 group">
            <svg
              class="w-4 h-4 group-hover:text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => {
                console.log("yooo");
                console.log("download wala", downloadUrl);
                const urlTest = "https://www.google.com/";
                window.location.href = downloadUrl;
              }}
            >
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
            </svg>
          </button> */}

          <button
            className="btn btn-primary"
            onClick={(e) => {
              handleLikeSong(song);
            }}
          >
            <FcLikePlaceholder size={25} />
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              !playlistCheck
                ? handleAddToPlaylist(song)
                : deleteFromPlaylist(song._id)
            }
          >
            {playlistCheck ? 'Remove from playlist' : 'Add to playlist'}
          </button>
          <button
            className='btn btn-primary'
            onClick={() =>
              !queueCheck ? handleAddToQueue(song) : deleteFromQueue(song._id)
            }
          >
            {queueCheck ? 'Remove from queue' : 'Add to queue'}
          </button>
            <FavoriteBorderIcon
                     onClick={(e) => {
                       handleLikeSong(song);
                     }}
                   />
        </li>
      ))}
    </ul>
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
  historyCheck: state.history.historyCheck,
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
  addCurrentSongInHistory: PropTypes.func.isRequired,
  deleteFromHistory: PropTypes.func.isRequired,
  historyCheck: PropTypes.bool,
  queueCheck: PropTypes.bool,
  deleteFromQueue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setCurrentSong,
  setPlaying,
  setNotPlaying,
  setAudio,
  setIndex,
  addCurrentSongInHistory,
  deleteFromHistory,
  setLoading,
  setArtistId,
  addToPlaylist,
  deleteFromPlaylist,
  addToQueue,
  deleteFromQueue,
  getLikedSongs,
  likeSong,
  unlikeSong,
})(Song);

// <div>
// <div className="flex flex-col">
//   <div className="overflow-x-auto">
//     <div className="p-1.5 w-full inline-block align-middle">
//       <div className="overflow-hidden border rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200   ">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  overflow-hidden truncate w-2 "
//               >
//                 #
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//               >
//                 Song
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  "
//               >
//                 Singer
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
//               >
//                 Duration
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
//               >
//                 buttons
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {songs.map((song, i) => (
//               <tr key={song.key}>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
//                   {i + 1}
//                 </td>
//                 <td>
//                   <div class="flex flex-row  ">
//                     <div>
//                       <img
//                         alt="song_img"
//                         src={
//                           song?.images?.coverart
//                             ? song.images.coverart
//                             : song.images
//                         }
//                         className="w-30 h-20 rounded-lg"
//                         onClick={() => handleClick(song)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     </div>
//                     <div>
//                       {" "}
//                       <strong>{song.title}</strong>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
//                   {song.subtitle}
//                 </td>
//                 <td>3min</td>
//                 <td>
//                   {" "}
//                   <button
//                     className="btn btn-primary"
//                     onClick={() =>
//                       !playlistCheck
//                         ? handleAddToPlaylist(song)
//                         : deleteFromPlaylist(song._id)
//                     }
//                   >
//                     {playlistCheck
//                       ? "Remove from playlist"
//                       : "Add to playlist"}
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() =>
//                       !queueCheck
//                         ? handleAddToQueue(song)
//                         : deleteFromQueue(song._id)
//                     }
//                   >
//                     {queueCheck ? "Remove from queue" : "Add to queue"}
//                   </button>
//                   {titles}
//                   <FavoriteBorderIcon
//                     onClick={(e) => {
//                       handleLikeSong(song);
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
