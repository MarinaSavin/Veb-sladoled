import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';
import { addToFavorites } from '../slices/favoriteSlice';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          Nazad
        </Link>
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      </>
    );
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  const addToFavoritesHandler = () => {
    dispatch(addToFavorites(product));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Nazad
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
            </ListGroup.Item>
            <ListGroup.Item>Cena: {product.price} RSD</ListGroup.Item>
            <ListGroup.Item>Opis: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Cena:</Col>
                  <Col>
                    <strong>{product.price} RSD</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Dodaj u korpu
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="outline-primary"
                  className="w-100"
                  onClick={addToFavoritesHandler}
                >
                  Dodaj u omiljene
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
