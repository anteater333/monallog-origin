
const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    line: {
        type: String,
    },
    tail: {
        type: String,
        default: "",
    },
    datePosted: {
        type: Date,
        default: Date.now(),
    },
    channel: {
        type: String,
    },
    likes: {
        type: Number,
    },
});



module.exports.schema = lineSchema;
module.exports.model = mongoose.model('Line', lineSchema);