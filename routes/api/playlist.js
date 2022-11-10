const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Playlist = require('../../models/Playlist');

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('subtitle', 'Subtitle is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const song = await Playlist.findOne({
        title: req.body.title,
        user: req.user.id,
      });
      if (song) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Song already added to playlist' }] });
      }
      const im = {
        coverart: req.body.image,
      };
      console.log(req.body.image);
      const newSong = new Playlist({
        title: req.body.title,
        subtitle: req.body.subtitle,
        images: im,
        user: req.user.id,
      });
      console.log('New song');
      console.log(newSong);
      await newSong.save();
      res.json(newSong);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const songs = await Playlist.find({ user: req.user.id });
    res.json(songs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const song = await Playlist.findById(req.params.id);
    if (!song) return res.status(404).json({ msg: 'Song not found' });
    await song.remove();
    res.json({ msg: 'Song removed from playlist' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Song not found' });
    res.status(500).send('Server Error');
  }
});

module.exports = router;
