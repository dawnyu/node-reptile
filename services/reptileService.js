const mongoose = require('mongoose'),
  Reptile = mongoose.model('Reptile'),
  uuidv1 = require('uuid/v1'),
  superagent = require('superagent')

class Service {
  constructor() {}
  async findOne() {
    let url
    let query = await Reptile.findOne((err,data) => {
      if(data){
        url = data.url
      }else{
        url = null
      }
    })
    return url
  }

  async find(limit) {
    let _data
    let query = Reptile.find({}).skip(0).limit(limit)
    await query.exec((err,data) => {
      _data = data
    }).then(() =>{
      _data.forEach(item => {
        Reptile.remove({id: item.id },err => {})
      })
    })
    return _data
  }

 async reptile(baseUrl) {
    var arr = [],lastArr = []

  superagent.get(baseUrl).end(function (err, res) {
    if(!res) return
      let text = res.text || ''
      if(text.indexOf('X-Frame-Options') > -1) return
      arr = text.match(/((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig)
      if(!arr) return
      arr.forEach(function(item){
        if(item.indexOf('://www') > -1 
        && item.indexOf('baidu') === -1 
        && item.indexOf('...') === -1 
        && item.indexOf('.jpg') === -1
        && item.indexOf('.png') === -1
        && item.indexOf('.pdf') === -1
        && item.indexOf('.zip') === -1
        && item.indexOf('.exe') === -1
        && item.indexOf('.txt') === -1
        && item.indexOf('.doc') === -1
        && item.indexOf('.rm') === -1
        && item.indexOf('.mp4') === -1
        && item.indexOf('.mv') === -1
        && item.indexOf('.dtd') === -1
        && item.indexOf('www.w3.org') === -1
        && item.indexOf('.swf') === -1
        && item.indexOf('gmw') === -1
        && item.indexOf('china') === -1
		&& item.indexOf('gaotie') === -1
        && item.indexOf('.gov') === -1
        && item.indexOf('.svg') === -1
        && item.indexOf('.xsl') === -1
        && item.indexOf('.gif') === -1){
          lastArr.push(item)
        }
      })
      for (let url of lastArr) {
		let agent = 'p'
		if(url.indexOf('//m.') > -1 || url.indexOf('//wap.') > -1) agent = 'm'
        Reptile.find({url:url}).exec((err, rept) => {
          if (!err) {
            if(rept && rept.length > 0) return
            Reptile.create({
              id: uuidv1(),
              url: url,
			  agent: agent
            }, err => {
              if (err) {
                console.log('insert data err:%s', err)
              }
            })
          }
        })
      }
    })
  }
}

module.exports = new Service()