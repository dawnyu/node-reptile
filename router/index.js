const Router = require('koa-router')
const user = require('../controller/User')

module.exports = function(){
  var router = new Router({
    prefix: '/api'
  })
  router.get('/hello/:id',user.hello)
  
  router.get('/add/:username/:password', user.add)
  
  router.post('/post',user.post)

  // router.post('/mysqlAdd',user.mysqlAdd)

  return router
}