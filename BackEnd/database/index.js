const mongoose = require('mongoose');

const models = require('./model');

const logger = require('../logger');

let database = {};

database.connect = () => {
    logger.info('setting database connection.');

    mongoose.Promise = global.Promise;
    
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect('mongodb://localhost:27017/monallogDB', {useNewUrlParser: true});
    const db = mongoose.connection;

    // 이벤트별 callback 설정
    db.on('open', () => {
        logger.info('database opened');
    });
    db.on('disconnected', () => {
        logger.info('database disconnected');
    });
    db.on('error', (err) =>{
        logger.error(err);
    });
}

database.models = models;

module.exports = database;