const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);