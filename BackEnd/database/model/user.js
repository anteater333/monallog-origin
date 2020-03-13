
const mongoose = require('mongoose');

const lineSchema = require('./lines').schema;
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    // userPassword: {
    //
    // },
    email: {
        type: String
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: Array,
        of: String,
    },
    lines: [lineSchema],
});

// plugins
const autoIncrement = require('mongoose-sequence')(mongoose);
userSchema.plugin(autoIncrement, {inc_field: 'userId'});

//static methods
userSchema.static('findAll', function(callback) {
    return this.find({ }, callback);
});

module.exports = mongoose.model('User', userSchema);