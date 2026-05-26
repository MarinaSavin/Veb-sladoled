import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProduct } from '../slices/adminProductsSlice';

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const product = products.find((item) => item._id === id);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        ...product,
        name,
        price: Number(price),
        image,
        category,
        countInStock: Number(countInStock),
        description,
      }),
    );
    toast.success('Proizvod je izmenjen');
    navigate('/admin/productlist');
  };

  if (!product) {
    return (
      <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Nazad
        </Link>
        <p>Proizvod nije pronadjen.</p>
      </>
    );
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Nazad
      </Link>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1>Izmeni proizvod</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Naziv</Form.Label>
              <Form.Control value={name} onChange={(event) => setName(event.target.value)} />
            </Form.Group>
            <Form.Group className="my-2" controlId="price">
              <Form.Label>Cena</Form.Label>
              <Form.Control type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
            </Form.Group>
            <Form.Group className="my-2" controlId="image">
              <Form.Label>Slika</Form.Label>
              <Form.Control value={image} onChange={(event) => setImage(event.target.value)} />
            </Form.Group>
            <Form.Group className="my-2" controlId="category">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control value={category} onChange={(event) => setCategory(event.target.value)} />
            </Form.Group>
            <Form.Group className="my-2" controlId="countInStock">
              <Form.Label>Stanje</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="description">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="my-3">
              Sacuvaj izmene
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProductEditScreen;
