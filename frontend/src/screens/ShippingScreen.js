import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Srbija');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h1>Dostava</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="address">
            <Form.Label>Adresa</Form.Label>
            <Form.Control value={address} onChange={(event) => setAddress(event.target.value)} required />
          </Form.Group>
          <Form.Group className="my-3" controlId="city">
            <Form.Label>Grad</Form.Label>
            <Form.Control value={city} onChange={(event) => setCity(event.target.value)} required />
          </Form.Group>
          <Form.Group className="my-3" controlId="postalCode">
            <Form.Label>Postanski broj</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="country">
            <Form.Label>Drzava</Form.Label>
            <Form.Control value={country} onChange={(event) => setCountry(event.target.value)} required />
          </Form.Group>
          <Button type="submit">Nastavi</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
