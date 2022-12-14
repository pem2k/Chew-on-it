const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follow extends Model { }

Follow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      // follower_id: {
      //   type: DataTypes.INTEGER,
      //   onDelete: "cascade"
      // },
      // followed_id: {
      //   type: DataTypes.INTEGER,
      //   onDelete: "cascade"
      // }
    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Follow