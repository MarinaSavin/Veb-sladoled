import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = new URLSearchParams(search).get('redirect') || '/';

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      setCredentials({
        name: email.toLowerCase().includes('admin') ? 'Administrator' : 'Registrovani korisnik',
        email,
        isAdmin: email.toLowerCase().includes('admin'),
      }),
    );
    toast.success('Uspesna prijava');
    navigate(redirect);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h1>Prijava</h1>
        <Form onSubmit={submitHandler}>
          <p className="text-muted">
            Za demo admin prikaz unesite email koji sadrzi rec <strong>admin</strong>.
          </p>
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
          <Button type="submit">Prijavi se</Button>
        </Form>
        <Row className="py-3">
          <Col>
            Novi korisnik? <Link to="/register">Registruj se</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;
