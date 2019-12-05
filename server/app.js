let express = require('express');
let app = express();
let server = app.listen(8080, () => {
    console.log('server work');
});

let conectedCount = 0;
var BallCoordinate
let io = require('socket.io')(server);
var roomName = 'SnakeGame';
var users = 0;
io.on('connection', (socket) => {
    socket.emit('statec-connection', 'You connected');
    socket.join(roomName);
    socket.on('join-game', () => {
        users++;
        console.log(users);
        if (users >= 2) {
            io.sockets.emit('start_game');
        }
    });
    socket.on('return_game', () => {
        io.sockets.emit('reload');
    })
    socket.on('addScore', (score) => {
        socket.broadcast.to(roomName).emit('setEnemyScore', score);
    });
    socket.on('newUser', () => {
        socket.broadcast.to(roomName).emit('newSnake');
    });
    socket.on('snakeMove', (request) => {
        socket.broadcast.to(roomName).emit('newCoordinate', request);
    })
    socket.on('genricBall', () => {
        if (!conectedCount) {
            coordinate = {
                x: (Math.round(Math.random() * (59) + 0))*10,
                y: (Math.round(Math.random() * (59) + 0))*10
            }
        }
        conectedCount++;
        io.sockets.to(roomName).emit('ball', coordinate);
    })
    socket.on('changeBallCoordinate', () => {
        coordinate = {
            x: (Math.round(Math.random() * (59) + 0))*10,
            y: (Math.round(Math.random() * (59) + 0))*10
        }
        io.sockets.to(roomName).emit('ballNew', coordinate);
    })
    socket.on('disconnect', function () {
        users--;
        socket.leave(roomName);
        console.log('user disconnected');
    });
});
