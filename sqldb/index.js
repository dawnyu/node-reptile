'use strict'

const Sequelize = require('sequelize'),
config = require('../db/config'),
db = {
  sequelize:new Sequelize(config.sequelize.database,config.sequelize.username,config.sequelize.password,config.sequelize)
}
db.User = db.sequelize.import('../mysqlModels/User')

module.exports = db