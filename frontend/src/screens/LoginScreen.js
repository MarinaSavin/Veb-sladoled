import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/usersApiSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const redirect = new URLSearchParams(search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Uspesna prijava');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h1>Prijava</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control
              type="email"
              placeholder="Unesite email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="password">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={isLoading}>Prijavi se</Button>
          {isLoading && <Loader />}
        </Form>
        <Row className="py-3">
          <Col>
            Novi korisnik? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Registruj se</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;
