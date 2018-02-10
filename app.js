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
var socketIds = new Set()
var io = require("socket.io").listen(server)
io.sockets.on('connection', function(socket) {
    console.log("Connection " + socket.id + " accepted.");
    socketIds.add(socket.id)
    socket.on('message', function(message) {
        console.log("Received message: " + message + " - from client " + socket.id);
        io.emit('message', message);
    });
    socket.on('disconnect', function() {
      socketIds.delete(socket.id)
    })
});

setInterval(() => {
   getUrl()
}, 20000)

var getUrl = function() {
  let url = returnFE(socketIds.size).then(data => {
    let url, index = 0
    socketIds.forEach((socketId) => {
      url = data.length > index ? data[index].url : data[index % data.length].url
	console.log('emit--',url)
      io.sockets.sockets[socketId].emit('url', url)
      index++
    })
  })
}
start()
