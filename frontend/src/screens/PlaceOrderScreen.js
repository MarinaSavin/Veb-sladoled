import { useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [paymentMethod, shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Greska prilikom kreiranja porudzbine');
    }
  };

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Dostava</h2>
            <p>
              {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Placanje</h2>
            <p>{paymentMethod}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Proizvodi</h2>
            {cartItems.map((item) => (
              <div className="d-flex justify-content-between" key={item._id}>
                <span>{item.name}</span>
                <span>
                  {item.qty} x {item.price} RSD
                </span>
              </div>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Pregled porudzbine</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Proizvodi</Col>
                <Col>{itemsPrice} RSD</Col>
              </Row>
              <Row>
                <Col>Dostava</Col>
                <Col>{shippingPrice} RSD</Col>
              </Row>
              <Row>
                <Col>PDV</Col>
                <Col>{taxPrice} RSD</Col>
              </Row>
              <Row>
                <Col>Ukupno</Col>
                <Col>{totalPrice} RSD</Col>
              </Row>
            </ListGroup.Item>
            {error && (
              <ListGroup.Item>
                <Message variant="danger">{error?.data?.message || error.error}</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
              >
                Naruci
              </Button>
              {isLoading && <Loader />}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
