import { gql } from 'apollo-boost';

export const MOVIE_LIST = gql`
  {
    movies {
      id
      name
      genre
      director {
        name
      }
    }
  }`

export const DIRECTOR_LIST = gql`
  {
    directors {
      id
      name
    }
  }`