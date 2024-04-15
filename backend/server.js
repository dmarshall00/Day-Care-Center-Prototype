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
app.use(express.json());

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DBASE
})

// const {Sequelize, DataTypes} = require('sequelize')
// const sequelize = new Sequelize(
//     DBASE,
//     USER,
//     PASSWORD,
//     {
//         host: HOST,
//         dialect: 'mysql'
//     }
// );

// sequelize.authenticate().then(()=>{
//     console.log("Sequelize connected...");
// }).catch((error)=>{
//     console.error("Sequelize not connected...", error);
// });

// var parenttable = sequelize.define("parentinfo", {
//     ParentID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     UserName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     FirstName: {
//         type: DataTypes.STRING,
//     },
//     LastName: {
//         type: DataTypes.STRING,
//     },
//     PhoneNumber: {
//         type: DataTypes.STRING,
//     },
//     Email: {
//         type: DataTypes.STRING,
//     },
//     ParentAddress: {
//         type: DataTypes.STRING,
//     }
// });

app.post('/signup', (req, res) => {
    console.log("Worked");
    // sequelize.sync(() => {
    //     console.log("Sequelize synced");
    // }).then(() => {
    //     parenttable.create({
    //         Username: req.body.username,
    //         Email: req.body.email,
    //         Password: req.body.password
    //     }).then(results => {
    //         console.log(results.dataValues);
    //     }).catch((error) => {
    //         console.error('Failed to create a new record: \n', error);
    //     });
    // }).catch((error) => {
    //     console.error("Sequelize failed to sync\n", error);
    // });

    console.log(req.body);
    const sql = `INSERT INTO 'day-care-center-prototype'.'parentinfo' ('UserName', 'Password', 'Email') VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}');`;
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    db.query(sql, (err, data) => {
        if(err){
            console.log(sql);
            console.error(err);
            return res.json('Error');
        }
        console.log(sql);
        return res.json(data);
    })
});

var port = 3001

app.listen(port, ()=>{
    console.log(`Server Started on port localhost:${port}...`)
});