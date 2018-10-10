const service = require('../services/userService')
const db = require('../sqldb/index')
const uuidv1 = require('uuid/v1')
const User = db.User

 exports.hello = async(ctx, next) =>{
    ctx.body = await service.find()
    await next()
  }

  exports.add = async(ctx, next) =>{
    const params = ctx.request.body
    ctx.body = await service.add(params.username,params.password)
    await next()
  }

  exports.post = async(ctx, next) =>{
    let name = ctx.request.body.name
    ctx.body = name
    await next()
  }

  exports.mysqlAdd = async(ctx,next) =>{
    let data = {
      username: 'admin',
      password:'123456',
      userId:uuidv1()
    }
    return db.sequelize.transaction(t => {
      return User.create(data,{
        transaction:t
      }).then(()=>{
        ctx.body = {success:true}
        next()
      }).catch(err =>{
        console.log('err=%s',err)
      })
    })
  }