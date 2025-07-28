import { Link } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  const deseases = [
    { name: "cataratas", verbose: "Cataratas" },
    { name: "miopia", verbose: "Miopía" },
    { name: "conjuntivitis", verbose: "Conjuntivitis" },
    { name: "desprendimiento_retina", verbose: "Desprendimiento de retina" },
  ];
  return (
    <footer>
      <Container className="pt-5">
        <Row className="d-flex flex-row justify-content-center text-center">
          <Col xs={12} md={4}>
            <h4>Informacion Relevante</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link className="text-decoration-none" to="/sitemap">
                  Mapa del Sitio
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center text-center mt-4">
          <Col className="copyright">
            <p>© 2025 Horizon</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;