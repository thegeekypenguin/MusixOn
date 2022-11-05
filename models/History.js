const mongoose = require('mongoose');
const HistorySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required: false
    },
    img_url:{
        type: String,
        required: false
    },
});

module.exports = History = mongoose.model('history',HistorySchema);