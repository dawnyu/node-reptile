const service = require('../services/reptileService')

const start = async() => {
    let data = await service.findOne()
    data ? task(data.url) : task()
}

const task = (url = 'https://i.maxthon.cn/') => {
    service.reptile(url)
    service
        .findOne()
        .then((data) => {
            // service.deleteById(data.id)
            setTimeout(() => {
                data.url ? task(data.url) : task()
            }, 1000 * 10)
        })
}

returnFE = async() => {
    return service.findRandom()
}

deleteUrl = async(ids) => {
    service.delete(ids)
}

module.exports = { start, returnFE, deleteUrl }