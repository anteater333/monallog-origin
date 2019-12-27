const router = require('express').Router();

/* Home Page */
router.get('/', (req, res) => {
    return res.json({
        title: 'monallog API server'
    });
});

/* channels */
router.use('/channels', require('./channel'));

module.exports = router;