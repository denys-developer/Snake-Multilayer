module.exports = function (io) {
    let conectedCount = 0;
    var BallCoordinate

    var rooms = [];
    var users = 0;
    var ident = [];
    var colors = [
        'rgb(244, 86, 244)',
        'rgb(244, 250, 49)',
        'rgb(251, 115, 201)',
        'rgb(154, 59, 97)'
    ];
    var snakeSize = 10;
    var fieldSize = 100;

    io.on('connection', (socket) => {
        var roomName = '';
        io.sockets.emit('add_room', rooms);
        socket.on('join-game', (id) => {
     
            socket.emit('statec-connection', 'You connected');
            socket.on('room_connection', (room) => {
                socket.emit('wait_other_players');
                roomName = room;
                socket.join(roomName);
                users++;
                ident.push(id);
                socket.emit('setId', id);
                if (io.sockets.adapter.rooms[roomName].length == 1) {
                    socket.emit('select_size')
                }
                if (io.sockets.adapter.rooms[roomName].length >= 2) {
                    var usercount = users;
                    io.sockets.to(roomName).emit('start_game');
                    io.sockets.to(roomName).emit('setSnakeSize', snakeSize);
                    io.sockets.to(roomName).emit('setFiledSize', fieldSize);
                    io.sockets.to(roomName).emit('add_players', ident);
                    io.sockets.to(roomName).emit('setBallSize', snakeSize);
                    io.sockets.to(roomName).emit('newConnection');
                }
            })

        });
        socket.on('success_login', () => {
            socket.emit('snake_setting');
            io.sockets.emit('add_room', rooms);
        })
        socket.on('return_game', () => {
            socket.emit('restartSnake');
            socket.emit('setFiledSize', fieldSize);
            socket.emit('setSnakeSize', snakeSize);
            socket.to(roomName).emit('restartScore');
            socket.broadcast.to(roomName).emit('restartEnemyScore');
        })
        socket.on('addScore', (score) => {
            socket.broadcast.to(roomName).emit('setEnemyScore', score);
        });
        socket.on('snakeMove', (request) => {
            io.sockets.emit('setSnakeSize', snakeSize);
            socket.broadcast.to(roomName).emit('newCoordinate', request);
        })

        socket.on('genricBall', () => {
            var color = colors[Math.floor(Math.random() * (colors.length - 0)) + 0];
            if (!conectedCount) {
                var rand = (min, max, num) => {
                    return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
                }
                console.log(rand(fieldSize, 1, 20));
                coordinate = {
                    x: rand(fieldSize, 1, 20),
                    y: rand(fieldSize, 1, 20)
                }
            }
            conectedCount++;
            io.sockets.to(roomName).emit('ball', { coordinate: coordinate, color: color });
        })
        socket.on('changeBallCoordinate', () => {
            var color = colors[Math.floor(Math.random() * (colors.length - 0)) + 0];
            var rand = (min, max, num) => {
                return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
            }
            console.log(rand(fieldSize, 1, 20));
            coordinate = {
                x: rand(fieldSize, 1, 20),
                y: rand(fieldSize, 1, 20)
            }
            io.sockets.to(roomName).emit('ballNew', { coordinate: coordinate, color: color });
        })
        socket.on('set_size', (size) => {
            snakeSize = size.snake;
            fieldSize = size.field;

            io.sockets.to(roomName).emit('wait_other_players');
        });
        socket.on('create_room', (room) => {
            rooms.push(room);
            console.log(rooms);
            io.sockets.emit('add_room', rooms);
        })
        socket.on('disconnect', function () {
            users--;
            socket.leave(roomName);
            console.log('user disconnected');
        });
    });

}