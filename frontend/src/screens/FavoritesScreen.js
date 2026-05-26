import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../slices/favoriteSlice';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const { favoriteItems } = useSelector((state) => state.favorites);

  return (
    <Row>
      <Col md={8}>
        <h1>Omiljeni proizvodi</h1>
        {favoriteItems.length === 0 ? (
          <p>
            Nemate omiljene proizvode. <Link to="/">Vrati se na proizvode</Link>
          </p>
        ) : (
          <ListGroup variant="flush">
            {favoriteItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>{item.price} RSD</Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => dispatch(removeFromFavorites(item._id))}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default FavoritesScreen;
