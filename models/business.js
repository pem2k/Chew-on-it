const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Business extends Model { }

Business.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      business_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      }
    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Business