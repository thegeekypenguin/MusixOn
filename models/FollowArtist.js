const mongoose = require('mongoose');

const FollowArtistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = FollowArtist = mongoose.model(
  'followArtist',
  FollowArtistSchema
);
