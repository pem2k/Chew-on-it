const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")
const sequelize = require('../config/connection');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

    },

    profile_pic_url:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "/img/default_profile.jpg"
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 32]
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            return userObj;
        }
    }
});

module.exports = User