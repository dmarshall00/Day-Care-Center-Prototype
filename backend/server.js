import { sequelize, Environment, ChooseTable } from './Table.mjs';
import pkg from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const cookies = require('cookie-parser');
// const bodyparser = require('body-parser');
Environment();

const Express = pkg;
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

sequelize.authenticate().then(()=>{
    console.log("----------------\nSequelize connected...");
}).catch((error)=>{
    console.error("----------------\nSequelize not connected...", error);
});

app.post('/signup', (req, res) => {
    console.log("----------------\nSigning Working");
    console.log(req.body);

    var table = ChooseTable(req.body.user[0]);

    sequelize.sync()
    .then(() => {
        table.create({
            UserName: req.body.username[0],
            Email: req.body.email[0],
            Password: req.body.password[0]
        }).then(results => {
            console.log("----------------\nSequelize Worked");
            console.log(results.dataValues);
            return res.json({Registration: true});
        }).catch((error) => {
            console.error(error, '\n----------------\nFailed to create a new record: \n');
            return res.json({Registration: false});
        });
    }).catch((error) => {
        console.error("----------------\nSequelize failed to sync\n", error);
    });
});

app.post('/login', (req, res) => {
    console.log("----------------\nLogin Working");
    const username = req.body.user[0];
    const password = req.body.pwd[0];

    var table = ChooseTable(req.body.user[0]);

    sequelize.sync()
    .then(() => {
        console.log("----------------\n", req.body, "\n");
        table.findAll({
            where: {
                UserName: username,
                Password: password
            }
        }).then(data => {
            console.log("----------------\n", data, "\n----------------");
            if(data.length > 0)
            {
                req.session.username = data[0].UserName;
                console.log("Success: ", req.session.username);
                return res.json({
                    Login: true,
                    username: req.session.username
                });
            }else{
                console.log("Failed");
                return res.json({
                    Login: false
                });
            }
        })
    }).catch((error) => {
        return res.json({Message: "Error:\n" + error});
    });
});

app.get('/home', (req, res) => {
    if(req.session.username){
        return res.json({
            valid: true, 
            username: req.session.username
        })
    }
    else{
        return res.json({
            valid: false
        })
    }
});

var port = 3030

app.listen(port, ()=>{
    console.log(`Server Started on port localhost:${port}...`)
});