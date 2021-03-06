const app = require('express')();
const server = require('http').createServer(app);

const bodyParser = require('body-parser');
const cors = require('cors');

const Mocha = require('mocha');

const config = require('./config');
const logger = require('./logger');
const database = require('./database');

/** Greetings! ****************************************/
logger.info('monallog back-end server starts running.')
/******************************************************/

// set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// API routing
app.use('/', require('./api'));

// set database connection
database.connect();

server.listen(config.PORT, () => {
    logger.info(`listening on ${config.PORT} port!`)

    setTimeout(() => {
        myTester();
    }, 5000);
});

module.exports = app;


const myTester = () => {
    // let testData1 = new database.models.Channels({
    //     channelName: 'test',
    //     channelOptions: {
    //         backgroundURL: 'http://127.0.0.1:8083/media/bg-img/image202003252005430000000.gif',

    //     }
    // });
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

    // database.models.Users.find()
    // .then(docs => {
    //     console.log('Users---------------');
    //     if (docs.length === 0) console.log("no such user here");
    //     else {
    //         while (doc = docs.shift()) {
    //             console.log(doc.toString());
    //         }
    //     }
    //     console.log('------------------');
    // })
    // .catch(err => {
    //     console.error(err);
    // });

    // database.models.Channels.findAll()
    // .then(docs => {
    //     console.log('channels-------------');
    //     if (docs.length === 0) console.log("no channels here yet");
    //     else {
    //         docs.forEach((doc, idx) => {
    //             console.log(idx + " :: "+ doc);
    //         });
    //     }
    //     console.log('------------------');
    // })
    // .catch(err => {
    //     console.error(err);
    // });
}