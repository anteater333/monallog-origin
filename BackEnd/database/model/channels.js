
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

//static methods 등등 기능 추가 가능
channelSchema.static('findAll', function(callback) {
    return this.find({ }, callback);
});

//channelSchema.index({name: 1});

module.exports = mongoose.model('Channel', channelSchema);