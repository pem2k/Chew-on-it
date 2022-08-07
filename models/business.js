const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Business extends Model { }

Business.init(
    {
      
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