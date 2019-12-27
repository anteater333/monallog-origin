let clientNum = 0;

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        clientNum++;
        console.log('socket connected: ' + socket.id + ` (#${clientNum})`);
        
        socket.emit('news', {
            msg: `Hello, client #${clientNum}`,
            number: clientNum,
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
            socket.to(data.channel).emit('line', {
                line: data.line,
                author: data.author
            });
        });
        
        /**
         * on disconnect
        */
        socket.on('disconnect', () => {
            console.log('socket disconnected: ' + socket.id);
            clientNum--;
        })
    });

    console.log('socket.io 이벤트 리스너 등록.\n');
};