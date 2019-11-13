
const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    text: { type: String, required: true},
});



module.exports = mongoose.model('Line', lineSchema);