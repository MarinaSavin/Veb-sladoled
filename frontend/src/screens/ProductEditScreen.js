import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

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

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await updateProduct({
        ...product,
        name,
        price: Number(price),
        image,
        category,
        countInStock: Number(countInStock),
        description,
      }).unwrap();
      toast.success('Proizvod je izmenjen');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Nazad
      </Link>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
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
            <Button type="submit" className="my-3" disabled={loadingUpdate}>
              Sacuvaj izmene
            </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductEditScreen;
