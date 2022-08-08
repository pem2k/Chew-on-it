const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      content:{
        type: DataTypes.TEXT,

      },

      review_pic_url:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },

      business_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Business",
            key: "id"
        },
        onDelete: "cascade"
      },
      
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
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

module.exports = Review