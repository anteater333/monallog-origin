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
    
    // let testLine = new database.models.Lines({name: 'jokes', text: '열심히 공부중'});
    // testLine.save((err) => {
    //     if(err) {
    //         console.log('error 발생');
    //         console.log('-------------------------------');
    //         console.error(err);
    //         console.log('-------------------------------');
    //     }
    //     else {
    //         console.log("테스트용 데이터 추가됨 : " + testLine.collection.collectionName);
    //     }

    //     database.models.Channels.findAll((err, channels) => {
    //         if(err) console.log(err);
    //         else if(channels.length === 0) console.log('no channels here');
    //         else console.log(channels);
    //     });
    // });
});

module.exports = app;