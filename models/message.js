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
      },

      commenter_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        },
        onDelete: "cascade"
      },
      
      review_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "review",
          key: "id"
      },
      onDelete: "cascade"
      }

    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Message