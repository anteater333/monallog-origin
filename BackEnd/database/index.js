// 싹다 고쳐야함.

const mongoose = require('mongoose');

const models = require('./model');

let database = {};

database.connect = () => {
    mongoose.Promise = global.Promise;
    
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect('mongodb://localhost:27017/monallogDB', {useNewUrlParser: true});
    const db = mongoose.connection;

    // 이벤트별 callback 설정
    db.on('open', () => {
        console.log('database opened');
        
    });
    db.on('disconnected', () => {
        console.log('database disconnected');
    });
    db.on('error', (err) =>{
        console.log(err);
    });

    console.log('database 연결 및 이벤트 리스너 등록.\n');
}

database.models = models;

module.exports = database;