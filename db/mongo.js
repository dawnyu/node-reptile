const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const db = 'mongodb://localhost/nodemo'

mongoose.Promise = require('bluebird')
mongoose.connection.openUri(db)

const models_path = path.join(__dirname, '../models')
var walk = function (modelPath) {
  fs.readdirSync(modelPath)
    .forEach(function (file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)
      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      } else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)
