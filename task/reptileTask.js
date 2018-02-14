const service = require('../services/reptileService')

const start = async() => {
    let data = await service.findOne()
    data ? task(data.url) : task()
}

const task = (url = 'https://i.maxthon.cn/') => {
    service.reptile(url)
    service
        .findBaseRandom()
        .then((data) => {
            
            setTimeout(() => {
				let url = data && data.length > 0 ? data[0].url : ''
                task(url)
            }, 1000 * 2)
        })
}

const returnFE = async() => {
	const obj = service.findRandom()
    return obj
}

deleteUrl = async(ids) => {
    service.delete(ids)
}

module.exports = { start, returnFE, deleteUrl }