
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
    },
    channelOptions: {
        backgroundURL: {
            type: String
        },
        playlist: {
            type: Array,
            of: {
                title: String,
                by: String,
                URL: String
            }
        }
    },
});

// plugins
const autoIncrement = require('mongoose-sequence')(mongoose);
channelSchema.plugin(autoIncrement, {inc_field: 'channelId'});  // auto-increment

//static methods
channelSchema.statics.findAll = function() {
    return this.find({ })
};

channelSchema.index({channelName: 1});

module.exports = mongoose.model('Channel', channelSchema);