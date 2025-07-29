import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* SECCIÓN HERO*/}
      <section className="lm-hero-section d-flex align-items-center justify-content-center position-relative">
        <div className="lm-hero-overlay"></div>
        <div className="lm-hero-content text-white text-center">
          {/* Logo de la página */}
          <img
            src="/favicon.png"
            alt="Logo de Horizon"
            className="hero-logo" 
          />
          <h1 className="lm-hero-title display-3 fw-bold">
            Horizon
          </h1>
          <p className="lm-hero-lead fs-5">
            Cuidamos tu vista, ampliamos tu horizonte
          </p>
        </div>
      </section>

      {/* SECCIÓN PRINCIPAL DE CONTENIDO */}
      <main className="py-5 bg-gradient-light">
        {/* MISIÓN Y QUIÉNES SOMOS */}
        <Container className="my-5 text-center">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h2 className="section-title">Misión</h2>
              <p>
                Las enfermedades que afectan la visión son de las más comunes, y
                muchas podrían haberse prevenido o tratado a tiempo. Sin
                embargo, la información disponible suele ser técnica, confusa o
                poco atractiva.
              </p>
              <p className="mb-5">
                En Horizon creemos que la educación médica no tiene por qué ser
                así. Por eso creamos una plataforma visual e interactiva donde
                cualquier persona puede entender, prevenir y actuar frente a
                enfermedades oculares como las cataratas, la miopía, la
                conjuntivitis y el desprendimiento de retina, manteniendo un
                enfoque claro, accesible y visualmente atractivo.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h2 className="section-title">Quiénes Somos</h2>
              <p>
                Somos un pequeño grupo de estudiantes de Ingeniería de Sistemas
                de la Universidad del Valle, apasionados por la tecnología y la
                salud.
              </p>
              <p>
                Al notar que muchas personas no comprenden del todo lo que
                ocurre cuando reciben un diagnóstico ocular, decidimos crear
                Horizon como una herramienta educativa apoyada en modelos 3D
                intuitivos, accesibles y fieles a la realidad médica.
              </p>
              {/* Logo de la universidad */}
              <img
                src="/images/logo-univalle.webp"
                alt="Logo de la Universidad del Valle"
                className="university-logo mt-3"
              />
            </Col>
          </Row>
        </Container>

        {/* INTEGRANTES DEL EQUIPO */}
        <Container className="my-5">
          <h2 className="section-title text-center mb-5">
            Integrantes del Equipo
          </h2>
          <Row className="justify-content-center g-4">
            <Col md={6} lg={3} className="d-flex">
            <a href="https://github.com/Yenreh" target="_blank" rel="noopener noreferrer" className="collaborator-link">
              <Card className="team-card w-100">
                <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/36575476?v=4" alt="Foto del integrante H"/>
                <Card.Body className="text-center"><Card.Title className="team-card-title">Herney Quintero</Card.Title></Card.Body>
              </Card>
            </a>
            </Col>
            <Col md={6} lg={3} className="d-flex">
            <a href="https://github.com/SheilaV7" target="_blank" rel="noopener noreferrer" className="collaborator-link">
              <Card className="team-card w-100">
                <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/145947567?v=4" alt="Foto del integrante S"/>
                <Card.Body className="text-center"><Card.Title className="team-card-title">Sheila Valencia</Card.Title></Card.Body>
              </Card>
            </a>
            </Col>
            <Col md={6} lg={3} className="d-flex">
            <a href="https://github.com/HoseStr" target="_blank" rel="noopener noreferrer" className="collaborator-link">
              <Card className="team-card w-100">
                <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/147567605?v=4" alt="Foto del integrante J"/>
                <Card.Body className="text-center"><Card.Title className="team-card-title">Jose Fuertes</Card.Title></Card.Body>
              </Card>
            </a>
            </Col>
            <Col md={6} lg={3} className="d-flex">
            <a href="https://github.com/MAMP29" target="_blank" rel="noopener noreferrer" className="collaborator-link">
              <Card className="team-card w-100">
                <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/106500061?v=4" alt="Foto del integrante M"/>
                <Card.Body className="text-center"><Card.Title className="team-card-title">Miguel Muñoz</Card.Title></Card.Body>
              </Card>
            </a>
            </Col>
          </Row>
        </Container>

        {/* POR QUÉ 3D Y A QUIÉN VA DIRIGIDO (Sin cambios en el JSX) */}
        <Container fluid className="three-d-section my-5 py-5">
            <Container>
                <Row className="align-items-start g-5">
                    <Col md={6}>
                        <h2 className="section-title-light">¿Por qué 3D?</h2>
                        <p className="white-color">
                            Ver es comprender. Las enfermedades oculares no suelen ser
                            intuitivas, y explicarlas con palabras o imágenes estáticas
                            puede resultar limitado.
                        </p>
                        <p className="white-color">
                            Al utilizar modelos 3D interactivos, buscamos representar de
                            forma realista lo que ocurre en el ojo humano durante una
                            enfermedad. Esto permite a los usuarios visualizar síntomas,
                            comprender efectos y explorar el ojo desde distintos ángulos,
                            algo difícil de lograr con otros medios.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h2 className="section-title-light">A quién va dirigido</h2>
                        <p className="white-color">
                            Cada sección sobre una enfermedad responde cuatro preguntas
                            esenciales: ¿Qué es? ¿Cómo se manifiesta? ¿Cómo se trata?
                            ¿Cómo se previene? Todo ello con el apoyo de modelos 3D,
                            ejemplos visuales y un lenguaje claro y directo.
                        </p>
                        <p className="white-color">
                            Horizon está pensado para estudiantes, docentes, pacientes y
                            familiares que desean entender mejor cómo afectan estas
                            condiciones a la visión y cómo enfrentarlas con información
                            confiable y comprensible.
                        </p>
                        <p className="white-color"> 
                            Además, los usuarios pueden participar en un quiz interactivo que 
                            les permite repasar lo aprendido y reforzar sus conocimientos sobre
                            cada enfermedad ocular de forma dinámica y divertida
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>


        {/* COLABORADORES Y TECNOLOGÍAS */}
        <Container className="my-5">
          <h2 className="section-title text-center">Herramientas utilizadas</h2>
          <p className="text-center lead mb-5 black-color">
            Nadie construye una visión clara del mundo por sí solo. En Horizon
            utilizamos diversas herramientas para dar vida a nuestras
            representaciones visuales.
          </p>
          <Row className="justify-content-center align-items-center g-4">
            <Col xs={6} md={4} lg={2} className="text-center">
            <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="collaborator-link">
                <Card className="collaborator-card">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
                    alt="Logo de Figma"
                />
                </Card>
                <p className="mt-2 collaborator-name">Figma</p>
            </a>
            </Col>
            <Col xs={6} md={4} lg={2} className="text-center">
            <a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer" className="collaborator-link">
                <Card className="collaborator-card">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg"
                    alt="Logo de Blender"
                />
                </Card>
                <p className="mt-2 collaborator-name">Blender</p>
            </a>
            </Col>
            <Col xs={6} md={4} lg={2} className="text-center">
            <a href="https://sketchfab.com/" target="_blank" rel="noopener noreferrer" className="collaborator-link">
                <Card className="collaborator-card">
                <img
                    src="https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg"
                    alt="Logo de Sketchfab"
                />
                </Card>
                <p className="mt-2 collaborator-name">Sketchfab</p>
            </a>
            </Col>
            <Col xs={6} md={4} lg={2} className="text-center">
            <a href="https://threejs.org/" target="_blank" rel="noopener noreferrer" className="collaborator-link">
                <Card className="collaborator-card">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg"
                    alt="Logo de Three js"
                />
                </Card>
                <p className="mt-2 collaborator-name">Three Js</p>
            </a>
            </Col>
            <Col xs={6} md={4} lg={2} className="text-center">
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="collaborator-link">
                <Card className="collaborator-card">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    alt="Logo de React"
                />
                </Card>
                <p className="mt-2 collaborator-name">React</p>
            </a>
            </Col>
          </Row>
        </Container>
      <Container className="text-center">
        <p className="disclaimer-text">
          <strong>Horizon</strong> es un proyecto educativo sin fines de lucro, desarrollado como parte de una asignatura en la <strong>Universidad del Valle</strong>.
        </p>
        <p className="disclaimer-text">
          El contenido presentado es puramente informativo y no sustituye la consulta médica profesional.
        </p>
      </Container>
      </main>
    </div>
  );
};

export default AboutUs;