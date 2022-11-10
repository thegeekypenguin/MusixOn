import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPlaylist, setPlaylistCheck } from "../../actions/playlist";
import { setSongs } from "../../actions/play";
import MusicPlayer from "./MusicPlayer";
import { setQueueCheck } from "../../actions/queue";
import Song from "./Song";
import { getLikedSongs } from "../../actions/like";

const LikedSong = ({
  playlistSongs,
  loadPlaylist,
  setSongs,
  playlistCheck,
  setPlaylistCheck,
  setQueueCheck,
  getLikedSongs,
  likedSongs,
}) => {
  useEffect(() => {
    setSongs([]);
    getLikedSongs();
  }, []);

  useEffect(() => {
    setSongs(likedSongs);
  }, [likedSongs]);

  // console.log(likedSongs);
  return (
    <div> <div class="relative h-80 bg-white rounded-lg shadow-lg   mb-4">
    <div class="absolute inset-0 rounded-lg overflow-hidden bg-[#263319]  ">
      <img src="./assets/likeSongbg.jpg" alt="" className=" mx-auto h-80 " />
    </div>
    <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>

    <div class="absolute flex space-x-6 transform translate-x-6 translate-y-48">
      <div class="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
        <img
          src="./assets/likesong.png"
          alt="My playlist"
          className="h-40 w-40"
        />
    <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-red"></div>

      </div>

      <div class="text-white pt-10">
        {/* <h3 class="font-bold text-3xl">{values.attributes?.name}</h3> */}
        <h3 class="font-bold text-3xl opacity-60">Liked Songs</h3>

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
  <Song />
 
    </div>
  );
};

LikedSong.propTypes = {
  playlistSongs: PropTypes.array.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  setSongs: PropTypes.func.isRequired,
  playlistCheck: PropTypes.bool.isRequired,
  setPlaylistCheck: PropTypes.func.isRequired,
  setQueueCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistSongs: state.playlist.playlistSongs,
  playlistCheck: state.playlist.playlistCheck,
  likedSongs: state.like.likedSongs,
});

export default connect(mapStateToProps, {
  loadPlaylist,
  setSongs,
  setPlaylistCheck,
  setQueueCheck,
  getLikedSongs,
})(LikedSong);
