const express = require('express');
const app = express();
const port = 8081;

const bodyParser = require('body-parser');

const database = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send(`Welcome to monallog API Server!\n`);
});

app.get('/echo/:name', (req, res) => {
    return res.json({
        description: "Test page.",
        message: req.params.name
    })
});

app.use('/channels', require('./api/channel'));

app.listen(port, () => {
    console.log(`Example app listening on ${port} port!`)
    
    database.init();
    
    let testLine = new database.models.lines({name: 'jokes', text: '열심히 공부중'});
    testLine.save((err) => {
        if(err) {
            console.log('error 발생');
            console.log('-------------------------------');
            console.error(err);
            console.log('-------------------------------');
        }
        else {
            console.log("테스트용 데이터 추가됨 : " + testLine.collection.collectionName);
        }

        database.models.channels.findAll((err, channels) => {
            if(err) console.log(err);
            else if(channels.length === 0) console.log('no channels here');
            else console.log(channels);
        });
    });
});

module.exports = app;