'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.UUID
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