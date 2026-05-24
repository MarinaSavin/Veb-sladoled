import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          Nazad
        </Link>
        <p>Proizvod nije pronadjen.</p>
      </>
    );
  }

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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
