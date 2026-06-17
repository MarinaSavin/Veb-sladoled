import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const redirect = new URLSearchParams(search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registracija uspesna');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h1>Registracija</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="name">
            <Form.Label>Ime</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite ime"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
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
          <Form.Group className="my-3" controlId="confirmPassword">
            <Form.Label>Potvrdite lozinku</Form.Label>
            <Form.Control
              type="password"
              placeholder="Potvrdite lozinku"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={isLoading}>Registruj se</Button>
          {isLoading && <Loader />}
        </Form>
        <Row className="py-3">
          <Col>
            Vec imate nalog? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Prijavite se</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
