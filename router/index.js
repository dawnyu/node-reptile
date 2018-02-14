const Router = require('koa-router')
const url = require('../controller/Url')

module.exports = function(){
  var router = new Router({
    prefix: '/api'
  })

  router.get('/getUrl',url.getUrl)


  return router
}