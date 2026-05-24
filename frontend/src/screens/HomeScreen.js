import { useMemo, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import products from '../products';

const HomeScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Svi ukusi');

  const categories = ['Svi ukusi', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchKeyword = product.name.toLowerCase().includes(keyword.toLowerCase());
        const matchCategory = category === 'Svi ukusi' || product.category === category;

        return matchKeyword && matchCategory;
      }),
    [category, keyword],
  );

  return (
    <>
      <section className="hero-card mb-4">
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <p className="text-primary fw-semibold mb-1">Online prodaja sladoleda</p>
            <h1 className="display-6 fw-bold mb-3">Ice Shop</h1>
            <p className="lead mb-0">
              Pregledaj ukuse, izaberi omiljeni sladoled i naruci direktno iz online kataloga.
            </p>
          </Col>
          <Col lg={5}>
            <div className="hero-scoops" aria-label="Sladoled ilustracija">
              <span className="scoop scoop-vanilla" />
              <span className="scoop scoop-strawberry" />
              <span className="scoop scoop-choco" />
            </div>
          </Col>
        </Row>
      </section>

      <Card className="filter-card mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={7}>
              <Form.Label htmlFor="keyword">Pretraga</Form.Label>
              <Form.Control
                id="keyword"
                type="search"
                placeholder="Pronadji ukus..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Label htmlFor="category">Ukus</Form.Label>
              <Form.Select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Ice Shop proizvodi</h2>
        <span className="text-muted">{filteredProducts.length} proizvoda</span>
      </div>

      <ProductList products={filteredProducts} />
    </>
  );
};

export default HomeScreen;
