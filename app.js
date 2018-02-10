const Koa = require('koa')
const app = new Koa()
const path = require('path')
const fs = require('fs')
const logger = require('./middlewares/simpleLogger')
const bodyparser = require('koa-bodyparser')
// const sqldb = require('./sqldb')
require('./db/mongo')

const { start, returnFE, deleteUrl } = require('./task/reptileTask')

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
setTimeout(()=>{
  getUrl()
}, 3000)
setInterval(() => {
  getUrl()
}, 200000)

var getUrl = function() {
  let url = returnFE().then(data => {
    let ids = []
    if(!data || data.length === 0) return
    socketIds.forEach((type, socketId) => {
      let objs = [], urls = []
      if(type === 'p') {
        objs = data.filter(obj => obj.agent === 'p')
      } else {
        objs = data.filter(obj => obj.agent === 'm')
        if(!objs || objs.length === 0) objs = data
      }
      //取出前十条
	    if(objs.length > 10) {
        objs = objs.slice(0, 10)
      }
      //取出这十条id
      objs.forEach(obj => {
        let index = 0
        ids.push(obj.id)
        urls.push(obj.url)
        index = data.findIndex(item => item.id === obj.id )
        data.splice(index, 1)
      })
      console.log(urls)
      io.sockets.sockets[socketId].emit('url', urls)
    })
    deleteUrl(ids)
  })
}
start()