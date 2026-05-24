import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
