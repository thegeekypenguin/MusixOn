const express = require('express');
const FollowArtist = require('../../models/FollowArtist');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const data = await FollowArtist.find({ user: req.user.id });
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/:id', auth, async (req, res) => {
  try {
    const d = await FollowArtist.findOne({
      user: req.user.id,
      id: req.params.id,
    });
    if (d) {
      return res.status(400).send('Already followed');
    }
    const { name, image } = req.body;
    const follow = new FollowArtist({
      name: name,
      image: image,
      user: req.user.id,
      id: req.params.id,
    });
    await follow.save();
    res.json(follow);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const d = await FollowArtist.findOne({
      user: req.user.id,
      id: req.params.id,
    });
    await d.remove();
    res.json({ msg: 'Artist unfollowed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const data = await FollowArtist.findOne({
      user: req.user.id,
      id: req.params.id,
    });
    if (data) {
      res.json(data);
    } else res.json(null);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
