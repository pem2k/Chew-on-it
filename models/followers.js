const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follower extends Model { }

Follower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
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

module.exports = Follower