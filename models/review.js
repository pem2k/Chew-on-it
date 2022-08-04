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

      review_title:{
        type: DataTypes.STRING,
        allowNull: false
      },

      review_restaraunt:{
        type: DataTypes.STRING,
        allowNull: false
      },

      review_contents:{
        type: DataTypes.TEXT,
      },

      review_score:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
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

module.exports = Review