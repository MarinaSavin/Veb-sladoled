import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { addToCart } from '../slices/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-image" alt={product.name} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} className="product-title">
          <Card.Title as="h3">{product.name}</Card.Title>
        </Link>
        <Card.Text className="text-muted product-description">{product.description}</Card.Text>
        <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
        <div className="mt-auto">
          <Card.Text as="h4" className="product-price">
            {product.price} RSD
          </Card.Text>
          <Card.Text className={product.countInStock > 0 ? 'text-success' : 'text-danger'}>
            {product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}
          </Card.Text>
          <Button
            type="button"
            className="w-100"
            disabled={product.countInStock === 0}
            onClick={addToCartHandler}
          >
            Dodaj u korpu
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
