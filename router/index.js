const Router = require('koa-router')
const User = require('../controller/User')

module.exports = function(){
  var router = new Router({
    prefix: '/api'
  })

  router.get('/hello',User.hello)
  router.post('/user/add', User.add)

  return router
}