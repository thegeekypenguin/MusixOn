const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  images: {
    coverart: { type: String, required: true },
  },
});

module.exports = Playlist = mongoose.model('playlist', PlaylistSchema);
