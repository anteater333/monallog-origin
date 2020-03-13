const models = require('../../database').models;

exports.index = (req, res) => {     // GET /channels
    models.Channels.find()
    .then(docs => {
        res.json(docs);
    })
    .catch(err => {
        return res.status(520).json({
            error : 'Something Broken',
            msg : err
        });
    });
};

exports.show = (req, res) => {      // GET /channels/:id
    models.Channels.find({channelName: req.params.id})
    .then(docs => {
        if (docs.length === 0) { // No such channel
            return res.status(404).json({error: 'No such channel'});
        }
        else {
            return res.json(docs[0]);
        }
    })
    .catch(err => {
        return res.status(520).json({
            error : 'Something Broken',
            msg : err
        });
    });
};

exports.destroy = (req, res) => {   // DELETE /channels/:id
    const name = req.params.id; // 문자열 정수화
    if (!name) {
        return res.status(400).json({error: 'Incorrect name'});
    }

    models.Channels.deleteOne({channelName: name}, (err, result) => {
        if (err) {
            return res.status(520).json({
                error : 'Something Broken',
                msg : err
            });
        }
        return res.json(result);
    });
};

exports.create = (req, res) => {    // POST /channels
    const name = req.body.channelName;
    const inputData = new models.Channels({
        channelName: name
    });

    inputData.save()
    .then(channel => {
        res.status(201).json(channel);
    })
    .catch(err => {
        return res.status(520).json({
            error : 'Something Broken',
            msg : err
        });
    });
};

exports.update = (req, res) => {
    res.json();
};