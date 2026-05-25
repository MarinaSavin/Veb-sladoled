import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }

    dispatch(setCredentials({ name, email }));
    toast.success('Registracija uspesna');
    navigate('/');
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
          <Button type="submit">Registruj se</Button>
        </Form>
        <Row className="py-3">
          <Col>
            Vec imate nalog? <Link to="/login">Prijavite se</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
