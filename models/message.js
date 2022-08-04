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
       rest_review: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Message