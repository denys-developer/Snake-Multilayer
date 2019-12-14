import bodyParser = require("body-parser");
import express = require('express');
import cors = require('cors');
let dbConnection = require('./modules/db');
const tabel = `create table if not exists users(
    id int primary key auto_increment,
    login varchar(255) not null,
    password varchar(255) not null,
    nickname varchar(255) not null
  )`;
dbConnection.query(tabel, function (err: any, results: any) {
    // if (err) console.log(err);
    // else console.log("Таблица создана");
});
dbConnection.connect(function (err: any) {
    if (err) {
        return console.error("Помилка: " + err.message);
    }
    else {
        // console.log("Підключення до MySQL успішно встановлено");
    }
});
const app: express.Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let server = app.listen(8080, () => {
    console.log('server work');
});
let user = require('./routes/user');
app.use('/user', user);
let io = require('socket.io')(server);
let socket = require('./modules/socket')(io);


