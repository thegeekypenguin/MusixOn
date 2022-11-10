import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import "./bootstrap.min.css";

// import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import Search from "./components/layout/Search";
import Artist from "./components/layout/Artist";
import Playlist from "./components/layout/Playlist";
import History from "./components/features/History";
// redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./utils/PrivateRoute";
import Category from "./components/layout/Category";
import Queue from "./components/layout/Queue";
import MusicPlayer from "./components/layout/MusicPlayer";
import { connect } from "react-redux";
import Sidebar from "./components/layout/Sidebar";
import LikedSong from "./components/layout/LikedSong";
import SharePlaylist from "./components/layout/SharePlaylist";
import PlaylistsShared from "./components/layout/PlaylistsShared";
import ArtistsFollowed from "./components/layout/AritstsFollowed";
import SongLyrics from "./components/layout/SongLyrics";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Fragment>

          <div className='relative flex'>

            <Sidebar />
            {/* <div className="  h-[calc(100vh-72px)]   flex xl:flex-row flex-col-reverse"> */}
            <div className='flex-1 h-fit pb-40'>
              <Navbar />

              <section>
                <Alert />
                <Routes>
                  <Route exact path='/' element={<Landing />} />
                  {/* //modify this */}
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />

                  {/*  after this*/}
                  <Route element={<PrivateRoute />}>
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/search' element={<Search />} />
                    <Route exact path='/artist' element={<Artist />} />
                    <Route exact path='/playlist' element={<Playlist />} />
                    <Route exact path='/queue' element={<Queue />} />
                    <Route exact path='/likedSong' element={<LikedSong />} />
                    <Route exact path='/history' element={<History />} />
                    <Route exact path='/share' element={<SharePlaylist />} />
                    <Route
                      exact
                      path='/playlistsShared'
                      element={<PlaylistsShared />}
                    />
                    <Route
                      exact
                      path='/artistsFollowed'
                      element={<ArtistsFollowed />}
                    />
                    <Route exact path = '/songLyrics' element ={<SongLyrics />} />
                    <Route
                      exact
                      path='/top-indian-songs'
                      element={<Category />}
                    />
                    <Route
                      exact
                      path='/top-world-songs'
                      element={<Category />}
                    />
                    <Route exact path='/POP' element={<Category />} />
                    <Route exact path='/HIP_HOP_RAP' element={<Category />} />
                    <Route exact path='/DANCE' element={<Category />} />
                    <Route exact path='/ELECTRONIC' element={<Category />} />
                    <Route exact path='/SOUL_RNB' element={<Category />} />
                    <Route exact path='/ALTERNATIVE' element={<Category />} />
                    <Route exact path='/ROCK' element={<Category />} />
                    <Route exact path='/LATIN' element={<Category />} />
                    <Route exact path='/FILM_TV' element={<Category />} />
                    <Route exact path='/COUNTRY' element={<Category />} />
                    <Route exact path='/AFRO_BEATS' element={<Category />} />
                    <Route exact path='/WORLDWIDE' element={<Category />} />
                    <Route exact path='/K_POP' element={<Category />} />
                    <Route exact path='/FRENCH_POP' element={<Category />} />
                  </Route>
                </Routes>
                {isAuthenticated && <MusicPlayer />}
              </section>
            </div>
          </div>

          {/* <div className="fixed w-screen bottom-0 inset-x-0 ">
            <div className="py-3 bg-neutral-800/60 backdrop-blur-xl rounded-t-[2rem] text-white shadow-lg shadow-purple-50">
              <div className="container mx-auto px-3 lg:px-0 flex justify-between">

                <div className="flex items-center lg:w-3/12 gap-2">
                  <div className="w-14 h-14 lg:flex-shrink-0">image</div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-semibold">title</h6>
                    <span className="text-xs text-gray-400">artist</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 lg:w-2/12">
                  <button>skk</button>
                  <button className="rounded-full p-1 border border-purple-700">
                    tbplay/pause
                  </button>
                  <button>skipforward</button>
                </div>
                <div className="hidden lg:flex w-6/12 flex-col gap-1 justify-center">
                  slider
                  <div className="flex justify-between text-xs">
                    <span>currtime</span>
                    <span>duration</span>
                  </div>
                </div>
                <div className="flex justify-end gap-3 lg:w-1/12">
                  <div
                    className="relative flex items-center h-full"

                  >
                    <div className="flex absolute -top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg w-8 h-20 rounded-2xl overflow-hidden bg-neutral-100 py-4 justify-center">
                      slider
                    </div>

                    <button>tbvol</button>
                  </div>
                  <button>shuffle</button>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className='absolute bottom-0 left-0'>
            {isAuthenticated && <MusicPlayer />}
          </div> */}
          {/* </div> */}
        </Fragment>
      </Router>
    </>

    
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(App);
