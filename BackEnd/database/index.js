// 싹다 고쳐야함.

const mongoose = require('mongoose');

const models = require('./model');

let database = {};

database.init = () => {
    console.log('\ndatabase.init 호출. 나중에 지우세요오.\n');
    connect();
}

function connect() {
    mongoose.Promise = global.Promise;
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
}

database.models = models;

module.exports = database;