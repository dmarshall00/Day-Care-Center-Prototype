//import { Op } from '@sequelize/core';

require('dotenv').config();

HOST = process.env.HOST
USER = process.env.USER3
PASSWORD = process.env.PASSWORD
DBASE = process.env.DBASE
PORT = process.env.PORT

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     host: HOST,
//     user: USER,
//     password: PASSWORD,
//     database: DBASE
// })

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
    console.log("----------------\nWorked");
    sequelize.sync(() => {
        console.log("----------------\nSequelize synced");
    }).then(() => {
        parenttable.create({
            UserName: req.body.username[0],
            Email: req.body.email[0],
            Password: req.body.password[0]
        }).then(results => {
            console.log("----------------\nSequelize Worked");
            console.log(results.dataValues);
        }).catch((error) => {
            console.error('----------------\nFailed to create a new record: \n', error);
        });
    }).catch((error) => {
        console.error("----------------\nSequelize failed to sync\n", error);
    });

    console.log(req.body);
});

app.post('/login', (req, res) => {
    console.log("----------------\nWorked");
    sequelize.sync(() => {
        console.log("----------------\nSequelize synced");
    }).then(() => {
        console.log("----------------\n", req.body, "\n");
        parenttable.findAll({
            where: {
                UserName: req.body.username[0],
                Password: req.body.password[0]
            }
        }).then(data => {
            console.log("----------------\n", data, "\n");
            if(data.length > 0)
            {
                return res.json("Success");
            }else{
                return res.json("Failed");
            }
        })
    }).catch((error) => {
        console.error("----------------\nSequelize failed to sync\n", error);
    });

    console.log(req.body);
});

var port = 3001

app.listen(port, ()=>{
    console.log(`Server Started on port localhost:${port}...`)
});