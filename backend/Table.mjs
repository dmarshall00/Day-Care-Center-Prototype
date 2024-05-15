import {Sequelize, DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

var HOST = process.env.HOST;
var USER = process.env.USER3;
var PASSWORD = process.env.PASSWORD;
var DBASE = process.env.DBASE;
var PORT = process.env.PORT;

export const sequelize = new Sequelize(
    DBASE,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: 'mysql'
    }
);

export function ChooseTable(user)
{
    switch (user)
    {
        case 'Parent':
            return parenttable;
        case 'Faculty':
            return facultytable;
        case 'Admin':
            return admintable;
        default:
            console.error("No user!");
            return null;
    }
}

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

var facultytable = sequelize.define("Facultyinfo", {
    FacultyID: {
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
    }
});

var admintable = sequelize.define("Admininfo", {
    AdminID: {
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
    }
});

// export var childTable = sequelize.define("ChildrenInfo", {
//     ChildID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     Name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     ParentID: {
//         type: DataTypes.INTEGER,
//         references: 'parentinfos',
//         referencesKey: "ParentID",
//         allowNull: false
//     },
//     Comments: {
//         type: DataTypes.STRING,
//     }
// });

// parenttable.hasMany(childTable);