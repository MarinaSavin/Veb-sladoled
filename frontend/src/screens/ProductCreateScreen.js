import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useCreateProductMutation } from '../slices/productsApiSlice';

const ProductCreateScreen = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await createProduct({
        name,
        price: Number(price),
        image: image || '/images/products/vanila-bourbon.png',
        category,
        countInStock: Number(countInStock),
        description,
      }).unwrap();
      toast.success('Proizvod je dodat');
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
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1>Dodaj proizvod</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Naziv sladoleda</Form.Label>
              <Form.Control value={name} onChange={(event) => setName(event.target.value)} required />
            </Form.Group>
            <Form.Group className="my-2" controlId="price">
              <Form.Label>Cena</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="image">
              <Form.Label>Slika</Form.Label>
              <Form.Control
                placeholder="/images/products/vanila-bourbon.png"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="category">
              <Form.Label>Ukus</Form.Label>
              <Form.Control
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="countInStock">
              <Form.Label>Stanje</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="description">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="my-3" disabled={isLoading}>
              Sacuvaj proizvod
            </Button>
            {isLoading && <Loader />}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProductCreateScreen;
