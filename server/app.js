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
io.on('connection', (socket) => {
    socket.emit('statec-connection', 'You connected');
    socket.join(roomName);
    socket.on('join-game', (id) => {
        users++;
        console.log(users);
        ident.push(id);
        socket.emit('setId', id);
        if (users >= 2) {
            var usercount = users;
            io.sockets.emit('start_game');
            io.sockets.emit('add_players', ident);
            io.sockets.emit('newConnection');
        }
    });
    socket.on('return_game', () => {
        socket.emit('restartSnake');
        socket.emit('restartScore');
        socket.broadcast.to(roomName).emit('restartEnemyScore');
    })
    socket.on('addScore', (score) => {
        socket.broadcast.to(roomName).emit('setEnemyScore', score);
    });
    socket.on('snakeMove', (request) => {
        socket.broadcast.to(roomName).emit('newCoordinate', request);
    })
    socket.on('genricBall', () => {
       var color = colors[Math.floor(Math.random() * (colors.length - 0)) + 0]; 
       console.log(color);
        if (!conectedCount) {
            coordinate = {
                x: (Math.round(Math.random() * (59) + 0)) * 10,
                y: (Math.round(Math.random() * (59) + 0)) * 10
            }
        }
        conectedCount++;
        io.sockets.to(roomName).emit('ball', {coordinate:coordinate,color:color});
    })
    socket.on('changeBallCoordinate', () => {
        var color = colors[Math.floor(Math.random() * (colors.length - 0)) + 0]; 
        coordinate = {
            x: (Math.round(Math.random() * (59) + 0)) * 10,
            y: (Math.round(Math.random() * (59) + 0)) * 10
        }
        io.sockets.to(roomName).emit('ballNew',  {coordinate:coordinate,color:color});
    })
    
    socket.on('disconnect', function () {
        users--;
        socket.leave(roomName);
        console.log('user disconnected');
    });
});
