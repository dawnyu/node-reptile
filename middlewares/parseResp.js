module.exports = async(ctx, next) => {
  console.log()
  ctx.body = {
    isSuccess:0,
    ...ctx.body
  }
  await next()
  }