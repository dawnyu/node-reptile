const service = require('../services/reptileService.js')

 exports.getUrl = async(ctx, next) =>{
    ctx.body = await service.findRandom()
    await next()
  }