const Koa = require('koa')
const app = new Koa()
const path = require('path')
const fs = require('fs')
const logger = require('./middlewares/simpleLogger')
const bodyparser = require('koa-bodyparser')
const sqldb = require('./sqldb')
// require('./db/mongo')
//const cors = require('koa-cors');
//app.use(cors())
// const { start, returnFE } = require('./task/reptileTask')

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

server = app.listen(8900)

console.log('app started at port 8000...')
// var socketIds = new Map()
// var io = require("socket.io").listen(server)
// io.sockets.on('connection', function(socket) {
//     console.log("Connection " + socket.id + " accepted.");
//     socketIds.set(socket.id, 'p')
//     socket.on('message', function(type) {
//         console.log("Received message: " + type + " - from client " + socket.id);
//         socketIds.set(socket.id, type || 'p')
//     });
//     socket.on('disconnect', function() {
//         socketIds.delete(socket.id)
//     })
// });

// setInterval(() => {
//     getUrl()
// }, 10000)

// var getUrl = function() {
//     socketIds.forEach((type, socketId) => {
//         returnFE().then(data => {
// 			if(!data || data.length === 0) return
// 			console.log('emit socketId:%s url：%s',socketId, data[0].url)
// 			let socket = io.sockets.sockets[socketId]
//             socket && socket.emit('url', data[0].url)
//         })
//     })
// }
//start()