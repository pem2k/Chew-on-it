const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model { }

Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
<<<<<<< HEAD
       rest_review: {
        type: DataTypes.STRING,
        allowNull: false,
=======

      message_contents:{
        type: DataTypes.TEXT,
      },

      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        },
        onDelete: "cascade"
>>>>>>> dev
      }

    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Message