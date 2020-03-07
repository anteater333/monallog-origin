const app = require('express')();
const server = require('http').createServer(app);

const port = 8081;

const bodyParser = require('body-parser');

const database = require('./database');

// set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routing
app.use('/', require('./api'));

// set database connection
database.connect();

// set socket.io server
require('./socket')(server);

server.listen(port, () => {
    console.log(`Example app listening on ${port} port!`)
    
    // let testData1 = new database.models.Channels({channelName: 'jokes01'});
    // testData1.save((err) => {
    //     if(err) {
    //         console.log('error 발생');
    //         console.log('-------------------------------');
    //         console.error(err);
    //         console.log('-------------------------------');
    //     }
    //     else {
    //         console.log("테스트용 데이터 추가됨 : " + testData1.collection.collectionName);
    //     }

    //     database.models.Channels.findAll((err, channels) => {
    //         if(err) console.log(err);
    //         else if(channels.length === 0) console.log('no channels here');
    //         else console.log(channels);
    //     });
    // });

    // let testData2 = new database.models.Users({userName: 'anteater01'});
    // testData2.save((err) => {
    //     if(err) {
    //         console.log('error 발생');
    //         console.log('-------------------------------');
    //         console.error(err);
    //         console.log('-------------------------------');
    //     }
    //     else {
    //         console.log("테스트용 데이터 추가됨 : " + testData2.collection.collectionName);
    //     }

    //     database.models.Users.findAll((err, channels) => {
    //         if(err) console.log(err);
    //         else if(channels.length === 0) console.log('no users here');
    //         else console.log(channels);
    //     });
    // });

    database.models.Users.find({userName:'anteater01'})
    .then((docs) => {
        if (docs.length === 0) console.log("no such user here");
        else {
            console.log(docs[0].userName);
        }
    })
    .catch(err => {
        console.error(err);
    });
});

module.exports = app;