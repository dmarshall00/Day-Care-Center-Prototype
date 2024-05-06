//import { Op } from '@sequelize/core';

require('dotenv').config();

HOST = process.env.HOST
USER = process.env.USER
PASSWORD = process.env.PASSWORD
DBASE = process.env.DBASE
PORT = process.env.PORT

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookies());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize(
    DBASE,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log("----------------\nSequelize connected...");
}).catch((error)=>{
    console.error("----------------\nSequelize not connected...", error);
});

var parenttable = sequelize.define("Parentinfo", {
    ParentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FirstName: {
        type: DataTypes.STRING
    },
    LastName: {
        type: DataTypes.STRING
    },
    PhoneNumber: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ParentAddress: {
        type: DataTypes.STRING
    }
});

app.post('/signup', (req, res) => {
    console.log("----------------\nSigning Working");
    console.log(req.body);
    sequelize.sync()
    .then(() => {
        parenttable.create({
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
    sequelize.sync()
    .then(() => {
        console.log("----------------\n", req.body, "\n");
        parenttable.findAll({
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