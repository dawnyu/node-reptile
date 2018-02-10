const service = require('../services/reptileService')

const start = async() => {
  let url = await service.findOne()
  url ? task(url) : task()
}

const task = (url = 'https://i.maxthon.cn/') => {
  console.log('开始采集url:==%s', url)
  service.reptile(url)
    service
    .findOne()
    .then((data) => {
      setTimeout(() => {
        data ? task(data) : task()
      }, 30000)
    })
}

const mtask = (url = 'https://m.hao123.com') => {
  console.log('开始采集url:==%s', url)
  service.reptile(url)
    service
    .findOne()
    .then((data) => {
      setTimeout(() => {
        data ? mtask(data) : mtask()
      }, 20 * 60 *1000)
    })
}

returnFE = async(limit) => {
  let obj = service.find(limit)
  return obj
}

module.exports = { start, mtask, returnFE }
