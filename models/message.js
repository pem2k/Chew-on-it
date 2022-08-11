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

      message_contents:{
        type: DataTypes.TEXT,
        allowNull:false
      }

    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Message