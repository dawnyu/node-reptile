const db = require('../sqldb/index'),
  User = db.User,
  uuidv1 = require('uuid/v1')

class Service {
  constructor() {}
  async find(username) {
    return await User.find({username})
  }
  async add(username,password) {
    console.log(1,username,password)
   let user = await User.create({
      username: username,
      password: password
    },err =>{
      if(err){
        console.log('insert data err:%s',err)
      }else{
        console.log('save data success')
      }
    })
    return true
  }
}

module.exports = new Service()