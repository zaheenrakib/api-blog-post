const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BlogPost = sequelize.define(
  "BlogPost",
 {
   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
 },
 {
    timestamps: true,
 }

)

module.exports = BlogPost;
