import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from 'reactstrap';
import { MOVIE_LIST, DIRECTOR_LIST, ADD_MOVIE, ADD_DIRECTOR } from '../query/query'

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST);
  const [addMovie] = useMutation(ADD_MOVIE, { refetchQueries: [{ query: MOVIE_LIST }], awaitRefetchQueries: true });
  const [addDirector] = useMutation(ADD_DIRECTOR, { refetchQueries: [{ query: MOVIE_LIST }], awaitRefetchQueries: true });
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = ({ movieName, movieGenre, directorId }) => {
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } })
  };

  return (
    <div>
      <Card>
        <CardHeader>
          映画監督
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <input className="form-control" type="text" name="directorName" placeholder="監督名" />
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="number" name="directorAge" placeholder="年齢" />
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input className="form-control" type="text" name="movieName" pkaceholder="タイトル" ref={register} />
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="text" name="movieGenre" pkaceholder="ジャンル" ref={register} />
            </FormGroup>
            <FormGroup>
              <select className="form-control" type="select" name="directorId" ref={register}>
                {
                  data && data.directors.map(({ id, name }) => (
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
