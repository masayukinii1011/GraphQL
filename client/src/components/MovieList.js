import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, CardBody, Table, Button } from 'reactstrap';
import { MOVIE_LIST, DELETE_MOVIE } from '../query/query'

function MovieList() {
  const { loading, error, data: movieList } = useQuery(MOVIE_LIST)

  //削除メソッド
  const [deleteMovie] = useMutation(DELETE_MOVIE, { refetchQueries: [{ query: MOVIE_LIST }], awaitRefetchQueries: true });

  //削除ボタンクリックメソッド
  const handleDeleteMovie = movieId => {
    deleteMovie({ variables: { id: movieId } })
  };

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>Error</p>
  } else {
    return (
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>ジャンル</th>
                <th colSpan="2">監督</th>
              </tr>
            </thead>
            <tbody>
              {
                movieList.movies.map(({ id, name, genre, director }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{genre}</td>
                    <td>{director.name}</td>
                    <td><Button color="primary" onClick={() => handleDeleteMovie(id)}>削除</Button></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default MovieList;
