const graphql = require('graphql')
const Movie = require('../models/movies')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql

//スキーマ
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

//データの取得クエリ
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parents, args) {
        return Movie.findById(args.id)
      }
    }
  }
})

//データの追加クエリ
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: graphql.GraphQLString },
        genre: { type: graphql.GraphQLString }
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre
        })
        return movie.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})