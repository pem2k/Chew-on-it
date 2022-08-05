const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Following extends Model { }

Following.init(
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
      },
      followed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Following