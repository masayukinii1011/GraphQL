const express = require("express")
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const app = express()

//MongoDBへ接続
mongoose.connect('mongodb+srv://admin:admin@cluster0-imjxn.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('db connected')
})

//GraphQLにアクセスするミドルウェア
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

//サーバーを立てる
app.listen(4000, () => {
  console.log('listening port 4000')
})