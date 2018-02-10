// const DBM = require('./dbm'),   dbm = new DBM('../db/demo.json')
const mongoose = require('mongoose'),
  User = mongoose.model('User'),
  uuidv1 = require('uuid/v1')

class Service {
  constructor() {}
  async find() {
    let query = User.find({username:'test'}),
      res = []
    await query.exec((err, user) => {
      if (!err) {
        res = user
      }
    })
    return {list: res}
  }
  async add(username,password) {
   let user = await User.create({
      id: uuidv1(),
      username: username,
      pass: password
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