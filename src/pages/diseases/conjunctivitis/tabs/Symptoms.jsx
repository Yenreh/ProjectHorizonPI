import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Row, Col } from "react-bootstrap";
import SymptomsLights from "../Lights/SymptomsLights.jsx";
import { FaceEye } from "../model-3d/FaceEye.jsx";
import SymptomsControls from "../controls/SymptomsControls.jsx";
import SymptomsStaging from "../staging/SymptomsStaging.jsx";
import { LuRotate3D } from "react-icons/lu";

// Hook para controlar el zoom con la tecla Z
function ZoomOnKey({
  zoomPosition = [0.5, 0.3, 0.9],
  defaultPosition = [0, 0.5, 2.5],
  setZoomed,
}) {
  const { camera } = useThree();
  const keyPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return; // Evita repeticiones por mantener presionada la tecla
      if (e.key.toLowerCase() === "z" && !keyPressed.current) {
        keyPressed.current = true;
        camera.position.set(...zoomPosition);
        camera.lookAt(0, 0, 0);
        setZoomed?.(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === "z") {
        keyPressed.current = false;
        camera.position.set(...defaultPosition);
        camera.lookAt(0, 0, 0);
        setZoomed?.(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera, zoomPosition, defaultPosition, setZoomed]);

  return null;
}

export default function Symptoms() {
  const [zoomed, setZoomed] = useState(false);
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6} >
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon"> 
              <LuRotate3D title="Modelo 3D" />
            </div>
            <Canvas camera={{ position: [0, 0.5, 2.5], fov: 28 }} shadows>
              <Suspense fallback={null}>
                <SymptomsLights />
                <SymptomsStaging />
                <FaceEye position={[0, 0, 0]} />
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -1, 0]}
                >
                  <planeGeometry args={[10, 10]} />
                  <shadowMaterial opacity={0.7} />
                </mesh>
                <ZoomOnKey
                  zoomPosition={[0.38, 0.25, 0.9]}
                  defaultPosition={[0, 0.5, 2.5]}
                  setZoomed={setZoomed}
                />
              </Suspense>
              <SymptomsControls enabled={!zoomed} />
            </Canvas>
          </div>
        </Col>
        <Col md={6}>
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              Sintomas
            </h2>
            <p>
              Estos son los síntomas más comunes cuando alguien tiene
              conjuntivitis
            </p>
            <ul>
              <li>Ojo rojo</li>
              <li>Picazón en el ojo</li>
              <li>Lagrimeo constante</li>
              <li>Pus o lagañas</li>
              <li>Sensación de tener algo en el ojo</li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
}
