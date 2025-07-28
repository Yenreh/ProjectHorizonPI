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
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h4>Enfermedades</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {deseases.map((disease) => (
                <li key={disease.name}>
                  <Link
                    className="text-decoration-none"
                    to={`/${disease.name.replace("_", "-")}`}
                  >
                    {disease.verbose}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h4>Información</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link className="text-decoration-none" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/about">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/not-found">
                  Mapa del Sitio
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h4>Pruebas</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link className="text-decoration-none" to="/quiz">
                  Quiz
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