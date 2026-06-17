import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId && order && !order.isPaid) {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'EUR',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const createOrder = (data, actions) => {
    const totalInEur = (Number(order.totalPrice) / 117.2).toFixed(2);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalInEur,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Porudzbina je uspesno placena');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'Greska prilikom placanja porudzbine');
      }
    });
  };

  const onApproveTest = async () => {
    try {
      await payOrder({
        orderId,
        details: {
          id: 'test-payment',
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          payer: {
            email_address: 'test@paypal.com',
          },
        },
      }).unwrap();
      refetch();
      toast.success('Porudzbina je uspesno placena (test)');
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Greska prilikom test placanja');
    }
  };

  const onError = (err) => {
    toast.error(err?.data?.message || err.message || 'Greska prilikom placanja porudzbine');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error?.data?.message || error.error}</Message>;
  }

  return (
    <>
      <h1>Porudzbina {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Adresa za isporuku</h2>
              <p>
                <strong>Ime: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong>Adresa: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Dostavljeno datuma: {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Nije dostavljeno</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Nacin placanja</h2>
              <p>
                <strong>Metod: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Placeno datuma: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Nije placeno</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Proizvodi</h2>
              {order.orderItems.length === 0 ? (
                <Message>Porudzbina je prazna</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price.toFixed(2)} RSD ={' '}
                          {(item.qty * item.price).toFixed(2)} RSD
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Ukupno</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Proizvodi</Col>
                  <Col>{order.itemsPrice.toFixed(2)} RSD</Col>
                </Row>
                <Row>
                  <Col>Cena dostave</Col>
                  <Col>{order.shippingPrice.toFixed(2)} RSD</Col>
                </Row>
                <Row>
                  <Col>PDV</Col>
                  <Col>{order.taxPrice.toFixed(2)} RSD</Col>
                </Row>
                <Row>
                  <Col>Ukupna cena</Col>
                  <Col>{order.totalPrice.toFixed(2)} RSD</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      <Button onClick={onApproveTest} className="w-100 mb-2">
                        Test placanje
                      </Button>
                      {loadingPayPal && <Loader />}
                      {errorPayPal && (
                        <Message variant="danger">
                          {errorPayPal?.data?.message || errorPayPal.error}
                        </Message>
                      )}
                      {paypal?.clientId ? (
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      ) : (
                        !loadingPayPal && (
                          <Message variant="warning">
                            PayPal Client ID nije podesen u .env fajlu.
                          </Message>
                        )
                      )}
                    </>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
