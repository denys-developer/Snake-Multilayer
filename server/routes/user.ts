let router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
let dbConnection = require('../modules/db');
router.post('/register', (req: any, res: any) => {
    let password = req.body.password;
    let login = req.body.login;
    let nickname = req.body.nickname;
    bcrypt.genSalt(saltRounds,(err: any,salt: any)=>{
        bcrypt.hash(password, salt, (err: any, hash: any)=> {
            let sql = `INSERT INTO users(login, password, nickname) VALUES('${login}','${hash}','${nickname}')`;
            dbConnection.query(sql, function (err: any, results: any) {
                if (err) console.log(err);
            });        });
    })

    res.send(req.body);
})
router.post('/login', (req: any, res: any) => {
    let password = req.body.password;
    let login = req.body.login;
    let nickname = req.body.nickname;
    dbConnection.query(`SELECT * FROM users WHERE login = '${login}'`, function (err: any, result: any) {
        console.log(result);
        if (err) throw err;
        res.send(result);
    });
})
module.exports = router;