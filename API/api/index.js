const router = require('express').Router();
const models = require('../database').models;

/* Home Page */
router.get('/', (req, res) => {
    const title = 'monallog API server'

    /* Getting a random image */
    models.Channels.estimatedDocumentCount()
    .then(function(count) {
        const random = Math.floor(Math.random() * count);
        models.Channels.findOne().skip(random).lean()
        .then(doc => {
            return res.json({
                msg: title,
                image: doc.channelOptions.backgroundURL
            });
        })
        .catch(err => {
            return res.json({
                msg: title,
                image: ''
            });
        });
    });
});

/* channels */
router.use('/channels', require('./channel'));

module.exports = router;