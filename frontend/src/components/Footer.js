import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">Ice Shop &copy; {currentYear}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
