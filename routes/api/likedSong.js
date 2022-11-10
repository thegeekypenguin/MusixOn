const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const LikedSong = require('../../models/LikedSong');

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('subtitle', 'Subtitle is required').not().isEmpty(),
      // check('images', 'Image url is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const song = await LikedSong.findOne({
        title: req.body.title,
        user: req.user.id,
      });
      if (song) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Song already added to Liked Songs' }] });
      }
      const newSong = new LikedSong({
        title: req.body.title,
        subtitle: req.body.subtitle,
        images: { coverart: req.body.image },
        user: req.user.id,
      });
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
    const songs = await LikedSong.find({ user: req.user.id });
    res.json(songs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:title', auth, async (req, res) => {
  try {
    const song = await LikedSong.find({ title: req.params.title });
    console.log(song);
    if (!song[0]) return res.status(404).json({ msg: 'Song not found' });
    await song[0].remove();
    res.json({ msg: 'Song removed from LikedSong' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Song not found' });
    res.status(500).send('Server Error');
  }
});

module.exports = router;
