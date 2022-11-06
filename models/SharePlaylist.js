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
});