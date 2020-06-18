import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from 'reactstrap';
import { MOVIE_LIST, DIRECTOR_LIST, ADD_MOVIE, ADD_DIRECTOR } from '../query/query'

function SideNav() {
  const { data: directorList } = useQuery(DIRECTOR_LIST);

  const [addMovie] = useMutation(ADD_MOVIE, { refetchQueries: [{ query: MOVIE_LIST }], awaitRefetchQueries: true });
  const [addDirector] = useMutation(ADD_DIRECTOR, { refetchQueries: [{ query: DIRECTOR_LIST }], awaitRefetchQueries: true });

  const onSubmitMovie = ({ movieName, movieGenre, directorId }) => {
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } })
  };
  const onSubmitDirector = ({ directorName, directorAge }) => {
    addDirector({ variables: { name: directorName, age: parseInt(directorAge) } })
  };

  const { handleSubmit: handleSubmitMovie, register: registerMovie } = useForm();
  const { handleSubmit: handleSubmitDirector, register: registerDirector } = useForm();

  return (
    <div>
      <Card>
        <CardHeader>
          映画監督
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input className="form-control" type="text" name="directorName" placeholder="監督名" ref={registerDirector} />
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="number" name="directorAge" placeholder="年齢" ref={registerDirector} />
            </FormGroup>
            <Button color="primary" type="submit">追加</Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          映画作品
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitMovie(onSubmitMovie)}>
            <FormGroup>
              <input className="form-control" type="text" name="movieName" placeholder="タイトル" ref={registerMovie} />
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="text" name="movieGenre" placeholder="ジャンル" ref={registerMovie} />
            </FormGroup>
            <FormGroup>
              <select className="form-control" type="select" name="directorId" ref={registerMovie}>
                {
                  directorList && directorList.directors.map(({ id, name }) => (
                    <option value={id} key={id}>{name}</option>
                  ))
                }
              </select>
            </FormGroup>
            <Button color="primary" type="submit">追加</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SideNav;
