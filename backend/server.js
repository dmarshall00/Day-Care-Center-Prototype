import { sequelize, ChooseTable } from './Table.mjs';
import pkg from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { /*ChildInsert, ChildNum,*/ ParentProfile } from './parentface.mjs';

const Express = pkg;
const app = Express();
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true
}));
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

var port = 3030;

sequelize.authenticate().then(()=>{
    console.log("----------------\nSequelize connected...");
}).catch((error)=>{
    console.error("----------------\nSequelize not connected...", error);
});

app.post('/signup', (req, res) => {
    console.log("----------------\nSigning Working");
    console.log(req.body);

    var table = ChooseTable(req.body.User[0]);

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
    const username = req.body.username[0];
    const password = req.body.password[0];

    var table = ChooseTable(req.body.User[0]);
    console.log("----------------\n", req.body, "\n");
    // console.log("----------------\n", username, "\n",password, "\n");

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
                req.session.user = req.body.User[0];
                switch (req.body.User[0])
                {
                    case 'Parent':
                        req.session.ID = data[0].ParentID;
                        req.session.Address = data[0].ParentAddress;
                        break;
                    case 'Faculty':
                        req.session.ID = data[0].FacultyID;
                        break;
                    case 'Admin':
                        req.session.ID = data[0].AdminID;
                        break;
                }
                req.session.username = data[0].UserName;
                req.session.Fname = data[0].FirstName;
                req.session.Lname = data[0].LastName;
                req.session.Pnum = data[0].PhoneNumber;
                req.session.Email = data[0].Email;

                console.log("Success:", req.session.username);
                return res.json({
                    Login: true,
                    username: req.session.username,
                    Fname: req.session.Fname,
                    Lname: req.session.Lname,
                    Pnum: req.session.Pnum,
                    Email: req.session.Email,
                    Address: req.session.Address
                });
            }else{
                console.log("Failed");
                return res.json({
                    Login: false
                });
            }
        })
    }).catch((error) => {
        console.error("Error:\n" + error);
        return res.json({Message: "Error:\n" + error});
    });
});

app.get('/home', (req, res) => {
    console.log(req.session.username);

    if(req.session.username === ""){
        return res.json({
            valid: false
        })
    }
    else{
        console.log("----------------\n", req.session.user, "\n");
        sequelize.sync()
        .then(() => {

            //update the table
            var table = ChooseTable(req.session.user);
            const row = table.findOne({
                where: {
                    UserName: req.session.username
                }
            });
            if (!row) {
                console.log('user is missing');
            }
            else{
                req.session.Fname = row.FirstName;
                req.session.Lname = row.LastName;
                req.session.Pnum = row.PhoneNumber;
                req.session.Email = row.Email;
                req.session.Address = row.ParentAddress;
            }

        })
        return res.json({
            username: req.session.username,
            Fname: req.session.Fname,
            Lname: req.session.Lname,
            Pnum: req.session.Pnum,
            Email: req.session.Email,
            Address: req.session.Address,
            valid: true, 
        })
    }
});

ParentProfile(app);
// ChildNum(app);
// ChildInsert(app);

app.listen(port, ()=>{
    console.log(`Server Started on port localhost:${port}...`)
});