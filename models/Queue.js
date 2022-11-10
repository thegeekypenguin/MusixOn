const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
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

module.exports = Queue = mongoose.model('queue', QueueSchema);
