const graphql = require('graphql')
const Movie = require('../models/movie')
const Director = require('../models/director')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = graphql

//Movie(多) - (一)Director

//Movieスキーマ
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {//リレーション
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId)
      }
    }
  })
})

//Directorスキーマ
const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {//リレーション
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id })
      }
    }
  })
})

//データの取得クエリ
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id)
      }
    },
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
        genre: { type: graphql.GraphQLString },
        directorId: { type: GraphQLID }//リレーション
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId//リレーション
        })
        return movie.save()
      }
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt }
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age
        })
        return director.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})