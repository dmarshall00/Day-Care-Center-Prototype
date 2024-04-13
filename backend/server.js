require('dotenv').config();

HOST = process.env.HOST
USER = process.env.USER
PASSWORD = process.env.PASSWORD
DBASE = process.env.DBASE
PORT = process.env.PORT

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

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
    console.log("Sequelize connected...");
}).catch((error)=>{
    console.error("Sequelize not connected...", error);
});

app.post('/signup', (req, res) => {
    sequelize.sync().then(() => {
        let parenttable = sequelize.define("parentinfo", {
            ParentID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
        }
        });

        Book.create({
            
        }).then(res => {
            console.log(res)
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
     
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });
     
});

app.listen(3300, ()=>{
    console.log(`Server Started on port localhost:${PORT}...`)
});