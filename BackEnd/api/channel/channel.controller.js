exports.index = (req, res) => {     // GET /channels
    return res.json(channels);
};

exports.show = (req, res) => {      // GET /channels/:id
    const id = parseInt(req.params.id, 10); // 문자열 정수화
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    let channel = channels.filter(channel => channel.id === id )[0]
    if (!channel) {
        return res.status(404).json({error: 'Not found'});
    }

    return res.json(channel);
};

exports.destroy = (req, res) => {   // DELETE /channels/:id
    const id = parseInt(req.params.id, 10); // 문자열 정수화
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    let target = channels.findIndex(channel => channel.id === id )
    if (target === -1) {
        return res.status(404).json({error: 'Not found'});
    }

    let channel = channels.filter(channel => channel.id === id )[0]

    channels.splice(target, 1);
    return res.json(channel)
};

exports.create = (req, res) => {    // POST /channels
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({error: 'Incorrect name'});
    }

    const id = channels.reduce((maxId, channel) => {
        return channel.id > maxId ? channel.id : maxId
    }, 0) + 1;

    const newChannel = {
        id: id,
        name: name
    }

    channels.push(newChannel);

    return res.status(201).json(newChannel);
};


/* Temp Database */
let channels = [
    {
        id: 1,
        name: `jokes`,
    },
    {
        id: 2,
        name: `quotes`,
    },
    {
        id: 3,
        name: `tips`,
    }
]
//////////////////////////////