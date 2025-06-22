import { useState } from "react";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import "./Home.css";
import { useNavigate } from "react-router";

const Home = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const diseases = [
        { name: "cataratas", verbose: "Cataratas", image: "/images/home/catarata-carousel.webp" },
        { name: "miopia", verbose: "Miopía", image: "/images/home/miopia-carousel.webp" },
        { name: "conjuntivitis", verbose: "Conjuntivitis", image: "/images/home/conjuntivitis-carousel.webp" },
        { name: "desprendimiento_retina", verbose: "Desprendimiento de retina", image: "/images/home/desprendimiento-de-retina-carousel.webp" },
    ];

    const handleLearnMoreClick = () => {
        navigate("/aprende-mas");
    };

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section d-flex align-items-center justify-content-end position-relative">
                <div className="hero-overlay"></div>
                <div className="hero-content text-white text-end">
                    <h1 className="hero-title display-4 fw-bold">Horizon</h1>
                    <p className="lead">Cuidamos tu vista, ampliamos tu horizonte</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-5 bg-gradient-light">
                <Container>
                    <h2 className="home-section-title text-center mb-4">
                        Expande tus fronteras sobre las enfermedades que afectan tu salud ocular
                    </h2>
                    <Row className="g-4 align-items-center">
                        <Col md={6}>
                            <div className="pe-md-4 ps-md-4">
                                <p className="mb-4">
                                    En Horizon, nos dedicamos a brindarte información precisa y actualizada sobre las enfermedades
                                    oculares. Nuestro objetivo es ayudarte a comprender mejor tu salud ocular y empoderarte para
                                    tomar decisiones informadas.
                                </p>
                                <p>
                                    Ya sea que estés buscando información sobre síntomas, tratamientos o prevención, estamos aquí
                                    para guiarte en cada paso del camino. Nuestro equipo de expertos trabaja arduamente para ofrecerte
                                    contenido de calidad y recursos útiles.
                                </p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="intro-image-container">
                                <img
                                    src="/images/eye-color.webp"
                                    alt="Salud ocular"
                                    className="img-fluid img-fluid rounded-bottom-pill rounded-end-pill shadow"
                                />
                            </div>
                        </Col>
                        <Col xs={12} className="mt-4">
                            <div className="text-center mx-auto home-cta-text">
                                <p className="fw-bold">
                                    ¿Quieres saber más sobre cómo cuidar de tus ojos? ¡No te preocupes! En Horizon, tenemos
                                    recursos y herramientas para ayudarte a mantener una buena salud ocular.
                                </p>
                                <div className="mt-4">
                                    <Button variant="primary" size="lg" className="rounded-pill px-4" onClick={handleLearnMoreClick}>Aprende más</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Diseases Carousel Section */}
            <section className="py-5 bg-white">
                <Container>
                    <h3 className="home-section-title text-center mb-5">
                        Comienza a explorar las enfermedades
                    </h3>
                    <div className="bootstrap-carousel-wrapper">
                        <Carousel
                            activeIndex={index}
                            onSelect={handleSelect}
                            indicators={true}
                            interval={null}
                            className="disease-carousel"
                        >
                            {diseases.map((disease) => (
                                <Carousel.Item key={disease.name}>
                                    <div className="d-flex justify-content-center">
                                        <Card className="bootstrap-carousel-card">
                                            <Card.Img
                                                variant="top"
                                                src={disease.image}
                                                alt={disease.verbose}
                                            />
                                            <Card.Body className="text-center d-flex flex-column">
                                                <Card.Title className="fw-bold">{disease.verbose}</Card.Title>
                                                <Card.Text>
                                                    Explora lo relacionado a {disease.verbose.toLowerCase()}: síntomas, estadísticas y prevención
                                                </Card.Text>
                                                <Button
                                                    variant="outline-primary"
                                                    className="mt-auto align-self-center rounded-pill"
                                                    href={`/${disease.name}`}
                                                >
                                                    Comenzar
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </Container>
            </section>

            {/* Experience Section */}
            <section className="py-5 bg-gradient-light">
                <Container>
                    <h2 className="home-section-title text-center mb-5">
                        Vive la experiencia Horizon
                    </h2>
                    <Row className="g-4 justify-content-center">
                        <Col lg={5} md={6} className="d-flex">
                            <Card className="experience-card h-100 shadow border-0">
                                <div className="experience-card-img-wrapper">
                                    <Card.Img
                                        variant="top"
                                        src="/images/home/banner-3d-experience.webp"
                                        alt="Experiencia 3D"
                                    />
                                    <div className="experience-card-overlay">
                                        <h3 className="experience-card-title mb-0 fw-bold">Experiencia 3D</h3>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Text className="flex-grow-1">
                                        Un viaje a la profundidad de tus ojos mediante nuestra maravillosa experiencia 3D
                                    </Card.Text>
                                    <Button variant="secondary" className="mt-3 rounded-pill w-100" disabled>
                                        Proximamente
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={5} md={6} className="d-flex">
                            <Card className="experience-card h-100 shadow border-0">
                                <div className="experience-card-img-wrapper">
                                    <Card.Img
                                        variant="top"
                                        src="/images/home/banner-quiz.webp"
                                        alt="Quiz interactivo"
                                    />
                                    <div className="experience-card-overlay">
                                        <h3 className="experience-card-title mb-0 fw-bold">Quiz Interactivo</h3>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Text className="flex-grow-1">
                                        Prueba tus conocimientos aprendidos mediante nuestro quiz interactivo
                                    </Card.Text>
                                    <Button variant="secondary" className="mt-3 rounded-pill w-100" disabled>
                                        Proximamente
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;