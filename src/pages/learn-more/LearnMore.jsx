import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./LearnMore.css";

const LearnMore = () => {
  return (
    <div className="lm-bg">
      {/* Hero Section */}
      <section className="lm-hero-section d-flex align-items-center justify-content-center position-relative">
        <div className="lm-hero-overlay"></div>
        <div className="lm-hero-content text-white text-center">
          <h1 className="lm-hero-title display-4 fw-bold">Aprende más sobre tu salud visual</h1>
          <p className="lm-hero-lead fs-5">Descubre datos curiosos, consejos y recursos para cuidar tus ojos y prevenir enfermedades oculares.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-gradient-light">
        <Container>
          <h2 className="lm-section-title text-center mb-5">
            Información esencial para tu salud visual
          </h2>
          <Row className="g-4 mb-5">
            <Col lg={6} md={6}>
              <Card className="h-100 shadow border-0 lm-info-card">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title">
                    <i className="fas fa-lightbulb me-2"></i>
                    Datos curiosos
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="lm-card-list">
                      <li>El ojo humano puede distinguir aproximadamente 10 millones de colores diferentes.</li>
                      <li>Parpadear ayuda a mantener los ojos hidratados y limpios.</li>
                      <li>La miopía es una de las afecciones visuales más comunes en el mundo.</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card className="h-100 shadow border-0 lm-info-card">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title">
                    <i className="fas fa-eye me-2"></i>
                    Consejos para cuidar tu visión
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="lm-card-list">
                      <li>Realiza pausas cada 20 minutos si usas pantallas digitales.</li>
                      <li>Usa gafas de sol para protegerte de los rayos UV.</li>
                      <li>Mantén una dieta rica en frutas y verduras, especialmente de hoja verde.</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card className="h-100 shadow border-0 lm-info-card">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title">
                    <i className="fas fa-question-circle me-2"></i>
                    Mitos y realidades
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="lm-card-list">
                      <li><strong>Mito:</strong> Leer con poca luz daña la vista. <strong>Realidad:</strong> Puede cansar los ojos, pero no causa daño permanente.</li>
                      <li><strong>Mito:</strong> Usar mucho el celular causa ceguera. <strong>Realidad:</strong> Puede causar fatiga visual, pero no ceguera permanente.</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card className="h-100 shadow border-0 lm-info-card">
                <Card.Body className="p-5">
                  <Card.Title className="lm-card-title">
                    <i className="fas fa-link me-2"></i>
                    Recursos confiables
                  </Card.Title>
                  <Card.Text as="div">
                    <ul className="lm-card-list">
                      <li><a href="https://www.who.int/es/news-room/fact-sheets/detail/blindness-and-visual-impairment" target="_blank" rel="noopener noreferrer" className="lm-link">OMS: Ceguera y discapacidad visual</a></li>
                      <li><a href="https://www.aao.org/eye-health" target="_blank" rel="noopener noreferrer" className="lm-link">Academia Americana de Oftalmología</a></li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Infografía visual */}
          <div className="lm-infografia mb-5">
            <h2 className="lm-section-title text-center mb-4">¿Sabías que...?</h2>
            <Row className="g-4 justify-content-center">
              <Col lg={3} md={6} sm={6}>
                <Card className="text-center h-100 shadow-sm border-0 lm-stat-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img src="/images/eye-general.webp" alt="Ojo general" className="lm-stat-icon mb-3" />
                    <Card.Text className="lm-stat-text">
                      El 80% de los casos de discapacidad visual se pueden prevenir o tratar.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <Card className="text-center h-100 shadow-sm border-0 lm-stat-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img src="/images/eye-cataracts.webp" alt="Cataratas" className="lm-stat-icon mb-3" />
                    <Card.Text className="lm-stat-text">
                      Las cataratas son la principal causa de ceguera en el mundo.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <Card className="text-center h-100 shadow-sm border-0 lm-stat-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img src="/images/eye-myopia.webp" alt="Miopía" className="lm-stat-icon mb-3" />
                    <Card.Text className="lm-stat-text">
                      La miopía está aumentando rápidamente en la población joven.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={6}>
                <Card className="text-center h-100 shadow-sm border-0 lm-stat-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img src="/images/eye-conjunctivitis.webp" alt="Conjuntivitis" className="lm-stat-icon mb-3" />
                    <Card.Text className="lm-stat-text">
                      La conjuntivitis es una de las infecciones oculares más comunes.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* FAQ Section */}
          <Card className="lm-faq-card shadow border-0">
            <Card.Body>
              <h2 className="lm-section-title text-center mb-4">Preguntas frecuentes</h2>
              <Row>
                <Col>
                  <div className="lm-faq-list">
                    <div className="lm-faq-item mb-4">
                      <h5 className="lm-faq-question">¿Cada cuánto debo hacerme un examen visual?</h5>
                      <p className="lm-faq-answer">Se recomienda al menos una vez al año, especialmente si usas lentes o tienes antecedentes familiares.</p>
                    </div>
                    <div className="lm-faq-item mb-4">
                      <h5 className="lm-faq-question">¿El uso de pantallas daña la vista?</h5>
                      <p className="lm-faq-answer">No causa daño permanente, pero puede provocar fatiga visual y sequedad ocular.</p>
                    </div>
                    <div className="lm-faq-item">
                      <h5 className="lm-faq-question">¿Qué síntomas requieren atención urgente?</h5>
                      <p className="lm-faq-answer">Pérdida súbita de visión, dolor intenso, destellos o manchas negras repentinas.</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default LearnMore;
