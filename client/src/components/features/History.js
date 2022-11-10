import React, { useEffect, useInsertionEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getCurrentUserHistory , setHistoryCheck} from '../../actions/history';
import { setSongs } from '../../actions/play';
import Song from '../layout/Song';
import MusicPlayer from '../layout/MusicPlayer';
const History = ({getCurrentUserHistory,
    setHistoryCheck,
    histories,
    historyCheck,
    setSongs,
    }) =>{
    useEffect(()=>{
        //getting the history of the user
        setSongs([]);
        getCurrentUserHistory();
    }, []);
    
    useEffect(()=>{
        console.log('History data is cominnggggggggggggggggggggggg');
        console.log(histories);
        setSongs(histories);
        setHistoryCheck(true);
    },[histories]);
    console.log(histories);
    return (
        <div>
            <Song />
        </div>
    )
}
History.propTypes={
    getCurrentUserHistory: PropTypes.func.isRequired,
    historyCheck : PropTypes.bool.isRequired,
    histories: PropTypes.array.isRequired,
    setHistoryCheck: PropTypes.func.isRequired,
    setSongs: PropTypes.func.isRequired,
};
const mapStateToProp = (state) =>({
    histories: state.history.histories,
    historyCheck: state.history.historyCheck,
})
export default connect(mapStateToProp,{getCurrentUserHistory,setHistoryCheck,setSongs})(History);