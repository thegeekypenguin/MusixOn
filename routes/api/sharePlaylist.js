const express = require('express');
const router = express.Router();
const SharePlaylist = require('../../models/SharePlaylist');
const auth = require('../../middleware/auth');

router.put('/:id', auth, async (req, res) => {
  try {
    const x = await SharePlaylist.findOne({
      sender: req.user.id,
      receiver: req.params.id,
    });
    const songs = await Playlist.find({ user: req.user.id });
    console.log(songs);
    if (x) {
      x.playlist = songs;
      await x.save();
      res.json(x);
    } else {
      const s = new SharePlaylist({
        sender: req.user.id,
        receiver: req.params.id,
        playlist: songs,
      });
      await s.save();
      res.json(s);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try{
    const x = await SharePlaylist.find({receiver: req.user.id});
    res.json(x);
  } catch(err){
    console.log(err.message);
  }
})

router.get('/id/:id', auth, async (req, res) => {
  try {
    const x = await SharePlaylist.findOne({ sender: req.params.id, receiver: req.user.id });
    console.log(x);
    res.json(x);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
