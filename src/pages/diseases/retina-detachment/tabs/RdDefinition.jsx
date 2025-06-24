import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EyeCrossSection } from "../models-3d/EyeCrossSection";
import CameraSetup from "../camera/CameraSetup";
import RetinaLight from "../lights/RetinaLight";
import RdControls from "../controls/RdControls";
import { Col, Row } from "react-bootstrap";
import { Html } from "@react-three/drei";
import VideoSetup from "../media/VideoSetup";

export default function RdDefinition() {
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col md={6}>
          <div className="desease-canvas-wrapper">
            <Canvas camera={{ position: [0, 1, 3] }} shadows>
              <CameraSetup />
              <Suspense fallback={null}>
                <EyeCrossSection position={[0, 0, 0]} />
                <RetinaLight />
                <mesh receiveShadow position={[0, -1, 0]}>
                  <planeGeometry args={[10, 10]} />
                  <shadowMaterial transparent opacity={0.3} />
                </mesh>
              </Suspense>
              <RdControls />
            </Canvas>
          </div>
        </Col>
        <Col md={6}>
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              ¿Qué es?
            </h2>
            <p>
              Imagina que tu ojo funciona como una cámara, y la retina es la
              parte que capta la imagen: una capa delgada que transforma la luz
              en señales para que tu cerebro pueda ver. Esta capa está pegada en
              el fondo del ojo, y cuando se despega de su lugar, ocurre lo que
              se llama desprendimiento de retina. Al separarse, deja de recibir
              el oxígeno y nutrientes que necesita, lo que puede causar pérdida
              de visión. Es una urgencia médica que requiere atención inmediata.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12}>
          <div className="desease-text-definition p-4 mb-3 text-center">
            <h3 style={{ color: "var(--color-2)" }}>
              Simulación Adicional con Video
            </h3>
            <p>
              Observa otra perspectiva de los síntomas a través de esta
              simulación interactiva con video.
            </p>
          </div>
          <div
            className="desease-canvas-wrapper"
            title="Explora la simulación de video interactiva"
            style={{ height: "400px", width: "100%" }}
          >
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
              <Suspense
                fallback={
                  <Html center>
                    <span style={{ color: "black" }}>
                      Cargando simulación de video...
                    </span>
                  </Html>
                }
              >
                <VideoSetup videoSrc="/videos/retina-detachment.mp4" />
              </Suspense>
            </Canvas>
          </div>
        </Col>
      </Row>
    </section>
  );
}
