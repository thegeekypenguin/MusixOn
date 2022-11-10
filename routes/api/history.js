const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const History = require('../../models/History');
const config = require('config');
const auth = require('../../middleware/auth');
//@route /api/user/history
//@desc add the song in the history
//@acess private
router.post(
  '/song',
  [
    auth,
    [
      body('title', 'title is required').not().isEmpty(),
      body('subtitle', 'subtitle is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }
    try {
      const song = await History.findOne({
        title: req.body.title,
        user: req.user.id,
      });
      if (song) {
        // if song already exits in the history then remove it from the history
        // and add it back again
        return res
          .status(400)
          .json({ errors: [{ msg: 'Song already in the history' }] });
      }
      const newSong = new History({
        title: req.body.title,
        subtitle: req.body.subtitle,
        images: {coverart: req.body.image},
        user: req.user.id,
      });
      await newSong.save();
      res.json(newSong);
    } catch (error) {
      // const {title,subtitle,images,download_url} = req.body;
      // // find the user and add the song in that
      // const newSong = {title,subtitle,images,download_url};
      // try{
      //     // addding the song
      //     // form the specified user
      //     const history = History.findOne({user: req.user.id});
      //     // adding at the top
      //     history.songs.unshift(newSong);
      //     await history.save();
      //     res.json(history);
      // }
      // return the error
      console.log(error);
      return res.status(500).json({ msg: 'Server Errror' });
    }
  }
);

//@route /api/history
//@desc getting the history of the user
//@acess private
router.get('/', auth, async (req, res) => {
  try {
    // send the user_id with
    console.log('working...');
    const history = await History.find({ user: req.user.id });
    console.log(history);
    if (!history) {
      return res.json({ msg: 'history not found' });
    }
    res.json(history);
  } catch (error) {
    return res.status(400).json({ msg: 'Server Error' });
  }
});
//@route ADD  api/user/history/:song_id
//@desc add song in the history
//@acess Private

//@route DELETE api/user/history/:song_id
//@desc delete songs from the history
//@acess Private
router.delete('/:song_id', auth, async (req, res) => {
  try {
    // have to pass the song id with it
    const song = await History.findById(req.params.id);
    //iteratre through all ge the id
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    await song.remove();
    res.json({ msg: 'Song removed from history' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
