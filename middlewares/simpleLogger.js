module.exports = async(ctx, next) =>{
    console.info('[LOG]', ctx.method, ctx.originalUrl)
    await next()
};