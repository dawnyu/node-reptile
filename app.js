const Koa = require('koa')
const app = new Koa()
const path = require('path')
const fs = require('fs')
const logger = require('./middlewares/simpleLogger')
const bodyparser = require('koa-bodyparser')
    // const sqldb = require('./sqldb')
require('./db/mongo')

const { start, returnFE } = require('./task/reptileTask')

// const parseResp = require('./middlewares/parseResp')


// sqldb.sequelize.sync({force:false}).then(()=>{
//   console.log('mysql connect success')
// }).catch(err => console.log('mysql connect fail err:%s',err))


app.use(logger)
const router = require('./router/index')()

app.use(bodyparser())

app.use(router.routes())

// app.use(parseResp)
var server;
server = app.listen(8000)

console.log('app started at port 8000...')
var socketIds = new Map()
var io = require("socket.io").listen(server)
io.sockets.on('connection', function(socket) {
    console.log("Connection " + socket.id + " accepted.");
    socketIds.set(socket.id, 'p')
    socket.on('message', function(type) {
        console.log("Received message: " + type + " - from client " + socket.id);
        socketIds.set(socket.id, type || 'p')
    });
    socket.on('disconnect', function() {
        socketIds.delete(socket.id)
    })
});

setInterval(() => {
    getUrl()
}, 5000)

var getUrl = function() {
    socketIds.forEach((type, socketId) => {
        returnFE().then(data => {
            io.sockets.sockets[socketId].emit('url', data)
        })
    })
}
start()