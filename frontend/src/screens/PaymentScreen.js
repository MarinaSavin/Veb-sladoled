import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('Placanje pouzecem');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h1>Placanje</h1>
        <Form onSubmit={submitHandler}>
          <Form.Check
            className="my-3"
            type="radio"
            label="Placanje pouzecem"
            id="cash"
            name="paymentMethod"
            value="Placanje pouzecem"
            checked={paymentMethod === 'Placanje pouzecem'}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />
          <Form.Check
            className="my-3"
            type="radio"
            label="Kartica"
            id="card"
            name="paymentMethod"
            value="Kartica"
            checked={paymentMethod === 'Kartica'}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />
          <Button type="submit">Nastavi</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentScreen;
