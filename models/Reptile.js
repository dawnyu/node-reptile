const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const ReptileSchema = new Schema({
  id:{
    type:String,
    unique:true
  },
  url:{
    type:String
  },
  agent:{
    type:String
  },
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
})
ReptileSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else {
    this.meta.updateAt = Date.now()
  }
  next()
})


const Reptile = mongoose.model('Reptile',ReptileSchema)

module.exports = Reptile