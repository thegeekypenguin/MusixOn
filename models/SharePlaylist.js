const mongoose = require('mongoose');
const SharePlaylistSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  playlist: [
    {
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
    },
  ],
});

module.exports = SharePlaylist = mongoose.model(
  'sharePlaylist',
  SharePlaylistSchema
);
