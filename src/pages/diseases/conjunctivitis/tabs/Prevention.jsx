/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, ContactShadows } from "@react-three/drei";
import { Row, Col } from "react-bootstrap";
import PreventionLights from "../Lights/PreventionLights.jsx";
import { LuRotate3D } from "react-icons/lu";
import { TouchingEyes } from "../model-3d/TouchingEyes";
import PreventionStaging from "../staging/PreventionStaging.jsx";
import { ShadowMaterial } from "three";

export default function TreatmentTab() {
  const [showInfo, setShowInfo] = useState(false);
  const [rotating, setRotating] = useState(false);

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6}>
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon">
              <LuRotate3D title="Modelo 3D" />
            </div>
            {/* Botones en la esquina superior derecha */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 2,
                display: "flex",
                gap: 8,
              }}
            ></div>
            <Canvas camera={{ position: [0, -2, 0.5], fov: 30 }} shadows>
              <Suspense fallback={null}>
                <PreventionLights />
                <PreventionStaging />
                <TouchingEyes position={[0, -1.5, 0]} />
                {/* Plano receptor de sombra en la pared trasera */}
                <mesh receiveShadow rotation={[0, 0, 0]} position={[0, -2, -4]}>
                  <planeGeometry args={[6, 6]} />
                  <shadowMaterial opacity={0.7} />
                </mesh>
                <OrbitControls
                  enableZoom={false}
                  enableRotate={true}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6}>
        </Col>
      </Row>
    </section>
  );
}
