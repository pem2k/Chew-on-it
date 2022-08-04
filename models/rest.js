const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rest extends Model { }

Rest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rest_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rest_location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rest_review: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rest_details: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Model