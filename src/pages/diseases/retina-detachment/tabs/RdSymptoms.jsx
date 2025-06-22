/* eslint-disable react/no-unescaped-entities */
import { Canvas } from "@react-three/fiber";
import { Col, Row } from "react-bootstrap";
import GoldenGateHills from "../staging/GoldenGateHills";
import { useNavigate } from "react-router-dom";
import "./RdSymptoms.css";

export default function RdSymptoms() {
  const navigate = useNavigate(); // Obtén la función de navegación

  const handleCanvasClick = () => {
    navigate("/moscas-flotantes"); // Navega a la ruta deseada
  };

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col md={6}>
          {/* Añade onClick y un estilo para el cursor */}
          <div
            className="desease-canvas-wrapper clickable-canvas" // Añade una clase para el cursor
            onClick={handleCanvasClick}
            title="Haz clic para explorar la simulación de moscas flotantes" // Tooltip opcional
          >
            <Canvas>
              {/* ej: <GoldenGateHills interactive={false} /> */}
              <GoldenGateHills />
            </Canvas>
          </div>
        </Col>
        <Col md={6}>
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              Síntomas
            </h2>
            <p>
              El desprendimiento de retina no duele, por eso es fácil ignorarlo.
              Si notas uno o más de estos síntomas, acude de inmediato al
              oftalmólogo:
            </p>
            <ul>
              <li>
                <b>Aumento repentino de "moscas volantes":</b> pequeñas manchas
                o puntos oscuros que flotan en la visión, más notables en fondos
                claros.
              </li>
              <li>
                <b>Destellos de luz (fotopsias):</b> como relámpagos breves en
                los bordes del campo visual, incluso con los ojos cerrados.
              </li>
              <li>
                <b>Sombra o cortina en la visión:</b> muchas personas describen
                una zona oscura que va cubriendo parte del campo visual, como si
                algo se "bajara" frente al ojo.
              </li>
              <li>
                <b>Visión borrosa o distorsionada:</b> dificultad para enfocar,
                líneas rectas que parecen onduladas o deformadas.
              </li>
              <li>
                <b>Pérdida parcial de la visión:</b> generalmente en los bordes
                primero, pero puede avanzar hacia el centro si no se trata a
                tiempo.
              </li>
            </ul>
            <p>
              {" "}
              <small>
                Haz clic en la imagen de la izquierda para ver una simulación
                interactiva de las moscas volantes.
              </small>
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
}
