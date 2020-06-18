import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from 'reactstrap';
import { DIRECTOR_LIST, ADD_MOVIE } from '../query/query'

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST);
  const [addMovie] = useMutation(ADD_MOVIE);
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
              <input className="form-control" type="text" name="directorName" pkaceholder="監督名" />
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="number" name="directorAge" pkaceholder="年齢" />
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
