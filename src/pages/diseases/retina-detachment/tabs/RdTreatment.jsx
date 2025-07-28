import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Col, Row } from "react-bootstrap";
import Hospital from "../staging/Hospital";
import { Vitrectomy } from "../models-3d/Vitrectomy";
import { OrbitControls, Text3D } from "@react-three/drei";
import InteractiveTag from "../utils/InteractiveTag";
import FloorHospital from "../staging/FloorHospital";
import VitrectomyLight from "../lights/VitrectomyLight";
import { LuRotate3D } from "react-icons/lu";
import InfoButton from "../../myopia/Utils/InfoButton/InfoButton";

export default function RdTreatment() {
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col md={6}>
          <div className="desease-canvas-wrapper">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon">
              <LuRotate3D title="Modelo 3D" />
            </div>
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, display: 'flex', gap: 8 }}>
              <InfoButton buttonLabel="" iconClass="bi bi-info-circle-fill">
                Haz clic en la bola celeste para saber más información del procedimiento detrás de una vitrectomía
              </InfoButton>
            </div>
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
                <Text3D
                    position={[-15, 18, -10]}
                    rotation={[-6.162975822039155e-33, -1.5707963267948966, 0]}
                    font="/fonts/Montserrat-SemiBold.json"
                    size={4}
                    height={0.2} // profundidad del texto
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.03}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Vitrectomía
                    <meshStandardMaterial color="red" />
                </Text3D>
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
