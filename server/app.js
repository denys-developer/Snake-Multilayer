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
    socket.emit('statec-connection', 'You connected');
    socket.join(roomName);
    socket.on('join-game', (id) => {
        users++;
        console.log(users);
        ident.push(id);
        socket.emit('setId', id);
        if (users == 1) {
            socket.emit('select_size')
        }
        if (users >= 2) {
            var usercount = users;
            io.sockets.emit('start_game');
            io.sockets.emit('setFiledSize', fieldSize);
            io.sockets.emit('add_players', ident);
            io.sockets.emit('setSnakeSize', snakeSize);
            io.sockets.emit('setBallSize', snakeSize);
            io.sockets.emit('newConnection');
        }
    });
    socket.on('return_game', () => {

        socket.emit('restartSnake');
        socket.emit('setFiledSize', fieldSize);
        socket.emit('setSnakeSize', snakeSize);
        socket.emit('restartScore');
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
        console.log(color);

        if (!conectedCount) {

            var rand = (min, max, num) => {
                return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
            }
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
    })
    socket.on('disconnect', function () {
        users--;
        socket.leave(roomName);
        console.log('user disconnected');
    });
});
