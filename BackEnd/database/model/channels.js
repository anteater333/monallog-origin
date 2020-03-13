
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    //channelOptions: [],
    tags: {
        type: Array,
        of: String,
    },
    favorited: {
        type: Array,
        of: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    }
});

// plugins
const autoIncrement = require('mongoose-sequence')(mongoose);
channelSchema.plugin(autoIncrement, {inc_field: 'channelId'});  // auto-increment

//static methods
channelSchema.static('findAll', function(callback) {
    return this.find({ }, callback);
});

//channelSchema.index({name: 1});

module.exports = mongoose.model('Channel', channelSchema);