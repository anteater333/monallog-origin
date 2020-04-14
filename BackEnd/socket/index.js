const logger = require('../logger')

let clientNum = 0;

let emptyNums = []

module.exports = (server) => {
    logger.info('setting socket.io services.');
    
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        if (emptyNums.length !== 0)
            socket.clientNum = emptyNums.shift()
        else {
            socket.clientNum = clientNum
            clientNum++;
        }
        logger.info(`socket connected:: ${socket.id} (#${socket.clientNum})`);
        
        socket.emit('news', {
            msg: `Hello, client #${socket.clientNum}`,
            number: socket.clientNum,
        });

        /**
         * on echo
         * 테스트용 이벤트 입니다. data를 클라이언트에게 재전송 합니다.
        */
        socket.on('echo', (data) => {
            console.log(socket.id + ' :: echo: ' + data);
            socket.emit('news', data);
        });

        /**
         * on join
         * client의 채널 입장 요청을 처리합니다. 
         * data => {
         *     channel: String
         * }
        */
        socket.on('join', (data) => {
            let channel = data.channel;
            if (!channel) {
                socket.emit('news', {
                    msg: `ERR: wrong args`
                });
            }
            else if (1) {
                socket.join(channel, () => {
                    io.to(channel).emit('news', {
                        msg: `a new user has joined the room`
                    });
                    socket.emit('news', {
                        msg: `you have joined ${channel}.`
                    });
                });
            }
        });

        /**
         * on line
         * client가 보낸 line을 channel에 broadcasting 합니다.
         * data => {
         *     line: {},
         *     channel: String,
         *     author: {},
         * }
         */
        socket.on('line', (data) => {
            logger.info(`line:: "${data.line}" by ${data.author}(#${socket.clientNum}) @${data.channel} (${socket.request.connection.remoteAddress})`)
            socket.to(data.channel).emit('line', { // broadcast
                line: data.line,
                author: data.author
            });
            socket.emit('line', {   // myself
                line: data.line,
                author: data.author
            });
        });
        
        /**
         * on disconnect
        */
        socket.on('disconnect', () => {
            logger.info(`socket disconnected:: ${socket.id} (#${socket.clientNum})`);
            emptyNums.push(socket.clientNum)
        })
    });
};