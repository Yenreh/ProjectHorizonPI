import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Col, Row } from "react-bootstrap";
import Hospital from "../staging/Hospital";
import { Vitrectomy } from "../models-3d/Vitrectomy";
import { OrbitControls } from "@react-three/drei";
import InteractiveTag from "../utils/InteractiveTag";
import FloorHospital from "../staging/FloorHospital";
import VitrectomyLight from "../lights/VitrectomyLight";

export default function RdTreatment() {
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col md={6}>
          <div className="desease-canvas-wrapper">
            <Canvas camera={{ position: [-45, 0, 0] }} shadows>
              <Suspense fallback={null}>
                <Vitrectomy />
                <Hospital />
                <InteractiveTag
                  position={[-20, 0, -20]}
                  text="Se colocan aros para mantener el ojo abierto, se inserta una cánula, entra luz para ver y el vitrector retira el gel vítreo para reparar la retina."
                />
                <FloorHospital />
                <VitrectomyLight />
              </Suspense>
              <OrbitControls
                maxDistance={70}
                minDistance={20}
              />
            </Canvas>
          </div>
        </Col>
        <Col md={6}>
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              Tratamientos
            </h2>
            <p>
              El desprendimiento de retina es una urgencia médica, pero ¡la
              buena noticia es que existen tratamientos eficaces! Todos
              requieren cirugía, y el tipo de procedimiento depende del tipo y
              gravedad del desprendimiento.
            </p>

            <p>Aquí te presentamos los más comunes:</p>

            <ul>
              <li>
                <strong>Vitrectomía:</strong> Es una de las más utilizadas.
                Consiste en retirar el gel vítreo del interior del ojo (que a
                veces jala la retina) y reemplazarlo con gas o aceite de
                silicona que presiona la retina de vuelta en su lugar. El cuerpo
                luego reabsorbe el gas con el tiempo.
              </li>
              <li>
                <strong>Retinopexia neumática:</strong> En este procedimiento se
                inyecta una burbuja de gas dentro del ojo que empuja la retina
                hacia su posición original. El paciente debe mantener la cabeza
                en una posición específica durante varios días para que
                funcione.
              </li>
              <li>
                <strong>Indentación escleral:</strong> Se cose una pequeña banda
                de silicona alrededor del ojo, como un cinturón suave, que ayuda
                a reducir la tracción sobre la retina y permite que se adhiera
                nuevamente.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
}
