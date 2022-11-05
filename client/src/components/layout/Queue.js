import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadQueue, setQueueCheck } from '../../actions/queue';
import { setSongs } from '../../actions/play';
import { setPlaylistCheck } from '../../actions/playlist';
import MusicPlayer from './MusicPlayer';
import Song from './Song';

const Queue = ({
  queueSongs,
  loadQueue,
  setSongs,
  queueCheck,
  setQueueCheck,
  setPlaylistCheck,
}) => {
  useEffect(() => {
    setSongs([]);
    loadQueue();
  }, []);

  useEffect(() => {
    console.log("Queuepage",queueSongs);

    // setSongs(queueSongs);
    console.log('SetQueuepage', queueSongs);

    
    setQueueCheck(true);
    setPlaylistCheck(false);


  }, [queueSongs]);

  return (
    <div>
      {/* <Song /> */}
      {/* <MusicPlayer /> */}
    </div>
  );
};

Queue.propTypes = {
  queueSongs: PropTypes.array.isRequired,
  loadQueue: PropTypes.func.isRequired,
  setSongs: PropTypes.func.isRequired,
  queueCheck: PropTypes.bool.isRequired,
  setQueueCheck: PropTypes.func.isRequired,
  setPlaylistCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  queueSongs: state.queue.queueSongs,
  queueCheck: state.queue.queueCheck,
});

export default connect(mapStateToProps, {
  loadQueue,
  setSongs,
  setQueueCheck,
  setPlaylistCheck,
})(Queue);
