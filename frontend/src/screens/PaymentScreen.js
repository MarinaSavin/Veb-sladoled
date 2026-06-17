import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

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
            label="PayPal ili kreditna kartica"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />
          <Button type="submit">Nastavi</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentScreen;
