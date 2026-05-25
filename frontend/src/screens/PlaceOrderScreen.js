import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod, totalPrice } = useSelector(
    (state) => state.cart,
  );

  const placeOrderHandler = () => {
    dispatch(clearCartItems());
    toast.success('Porudzbina je kreirana');
  };

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Dostava</h2>
            <p>
              {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}
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
                <Col>Ukupno</Col>
                <Col>{totalPrice} RSD</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Naruci
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
