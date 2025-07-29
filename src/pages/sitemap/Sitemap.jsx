import React from "react";
import HoverLink from "./HoverLink";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Sitemap.css";

const Sitemap = () => {
  const deseases = [
    { name: "cataratas", verbose: "Cataratas" },
    { name: "miopia", verbose: "Miopía" },
    { name: "conjuntivitis", verbose: "Conjuntivitis" },
    { name: "desprendimiento_retina", verbose: "Desprendimiento de retina" },
  ];
  return (
    <div className="lm-bg">
      {/* Hero Section */}
      <section className="lm-hero-section d-flex align-items-center justify-content-center position-relative">
        <div className="lm-hero-overlay"></div>
        <div className="lm-hero-content text-white text-center">
          <h1 className="lm-hero-title display-4 fw-bold">Mapa del Sitio</h1>
          <p className="lm-hero-lead fs-5">Descubre todo el contenido disponible en Horizon.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-gradient-light">
        <Container>
          <Row className="g-4 mb-5">
            <Col lg={4} md={4}>
              <Card className="h-100 shadow border-0 lm-info-card position-relative">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title d-flex align-items-center">
                    <i className="bi bi-info-circle me-2"></i>
                    Informacion
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="list-unstyled d-flex flex-column gap-2">
                      <li>
                        <HoverLink to="/">Inicio</HoverLink>
                      </li>
                      <li>
                        <HoverLink to="/about">Sobre Nosotros</HoverLink>
                      </li>
                      <li>
                        <HoverLink to="/aprende-mas">Aprende más</HoverLink>
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={4}>
              <Card className="h-100 shadow border-0 lm-info-card">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title d-flex align-items-center">
                    <i className="bi bi-bandaid me-2"></i>
                    Enfermedades
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="list-unstyled d-flex flex-column gap-2">
                      {deseases.map((disease) => (
                        <li key={disease.name}>
                          <HoverLink className="link-clean" to={`/${disease.name}`}>
                            {disease.verbose}
                          </HoverLink>
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={4}>
              <Card className="h-100 shadow border-0 lm-info-card">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title">
                    <i className="bi bi-journal-text me-2"></i>
                    Evaluacion
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="list-unstyled d-flex flex-column gap-2">
                      <li>
                        <HoverLink className="link-clean" to="/quiz">
                          Quiz
                        </HoverLink>
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Sitemap;
