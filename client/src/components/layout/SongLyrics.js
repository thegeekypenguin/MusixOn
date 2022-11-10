import { Propane } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentSong } from '../../actions/play';
const  SongLyrics= ({
    setCurrentSong,title,subtitle,
})=> {
    //displaying the lyrics of the song
    const [lyrics,setLyrics] = useState('');
    useEffect(()=>{
        async function call(){
            // const options = {
            //     method: 'POST',
            //     url: 'https://lyrics-search.p.rapidapi.com/search/lyrics',
            //     headers: {
            //       'content-type': 'application/json',
            //       'X-RapidAPI-Key': '29eb251975msh4e8a63ff852eb80p18ac0bjsn6337e2cb89fc',
            //       'X-RapidAPI-Host': 'lyrics-search.p.rapidapi.com'
            //     },
            //     data: {"searchTerm":title}
            //   };
            //   console.log(title);
            //   axios.request(options).then(function (res) {
            //     setLyrics(res.data.lyrics)
            //     //   console.log(res.data.lyrics);
            //   }).catch(function (error) {
            //       console.error(error);
            //   });


            const options = {
              method: 'GET',
              url: `https://lyrics-plus.p.rapidapi.com/lyrics/${title}/${subtitle}`,
              headers: {
                'X-RapidAPI-Key': '2c061aba86msh183b4c22b799477p1cda77jsnf97151caa57d',
                'X-RapidAPI-Host': 'lyrics-plus.p.rapidapi.com'
              }
            };
            
            axios.request(options).then(function (res) {
              setLyrics(res.data.lyrics);
              console.log(res.data.lyrics);
            }).catch(function (error) {
              console.error(error);
            });
            // try{
            //     const res = await fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/2396871/lyrics?api_key=rEOe9Bxiu18BBPLcF3mPw9APeRH1Ax7JJ7stErg8Pw0wxly1KDkZcJncFyJXEktr');
            //     const data = await res.json();
            //     console.log(data);
            // } catch(err) {
            //     console.log(err.message)
            // }
        }
        console.log('calling the song lyrics function');
        call();
        
    },[])
    
  return (
    <div>
        <h1>SongLyrics...........</h1>
        <p>{lyrics}</p>
    </div>
  )
}
SongLyrics.propTypes = {
    setCurrentSong: PropTypes.func.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
}
const mapStateToProps = (state) =>({
    title: state.play.title,
    subtitle: state.play.subtitle,
})
export default connect(mapStateToProps,{setCurrentSong})(SongLyrics);
