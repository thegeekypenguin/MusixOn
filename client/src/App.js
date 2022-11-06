import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import "./bootstrap.min.css";

// import "./App.css";
import './index.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/layout/Search';
import Artist from './components/layout/Artist';
import Playlist from './components/layout/Playlist';

// redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import Category from './components/layout/Category';
import Queue from './components/layout/Queue';
import MusicPlayer from './components/layout/MusicPlayer';
import { connect } from 'react-redux';
import Sidebar from './components/layout/Sidebar';
import LikedSong from './components/layout/LikedSong';

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
            <div className='flex-1 h-fit pb-40'>
              {/* <Navbar /> */}

              <section>
                <Alert />
                <Routes>
                  <Route exact path='/' element={<Landing />} />

                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route element={<PrivateRoute />}>
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/search' element={<Search />} />
                    <Route exact path='/artist' element={<Artist />} />
                    <Route exact path='/playlist' element={<Playlist />} />
                    <Route exact path='/queue' element={<Queue />} />
                    <Route exact path='/likedSong' element={<LikedSong />} />

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
            <div />
          </div>
        </Fragment>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(App);
