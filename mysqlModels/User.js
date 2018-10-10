'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER(11)
    },
    createdAt:{
      type:DataTypes.DATE
    },
    updatedAt:{
      type:DataTypes.DATE
    },
    deletedAt:{
      type:DataTypes.DATE
    }
  }, {freezeTableName: true})

  return User
}