const mongoose = require('mongoose')

const Schema = mongoose.Schema

//モデル
const directorSchema = new Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model('Director', directorSchema)