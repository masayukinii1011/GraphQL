const mongoose = require('mongoose')

const Schema = mongoose.Schema

//モデル
const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String//リレーション
})

module.exports = mongoose.model('Movie', movieSchema)