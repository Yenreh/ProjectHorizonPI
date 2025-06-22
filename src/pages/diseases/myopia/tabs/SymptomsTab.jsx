/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows } from '@react-three/drei';
import { Row, Col } from 'react-bootstrap';
import SymptomsModel from '../model-3d/SymptomsModel.jsx';
import SymptomsModelLights from '../Lights/SymptomsModelLights.jsx';
import SymptomsStaging from '../Staging/SymptomsStaging.jsx';
import { LuRotate3D } from "react-icons/lu";

export default function SymptomsTab() {
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6} >
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon"> 
              <LuRotate3D title="Modelo 3D" />
            </div>
            <Canvas camera={{ position: [0, 1, 2] }} shadows={true}>
              <Suspense fallback={null}>
                <SymptomsStaging />
                <SymptomsModelLights />
                <SymptomsModel position={[0, 0, 0]} scale={6} />
                <mesh rotation-x={-Math.PI / 2} receiveShadow={true} position-y={-1.4}>
                  <circleGeometry args={[4, 8]} />
                  <meshStandardMaterial roughness={0.8} metalness={1} />
                </mesh>
                {/* Contact Shadows */}
                <ContactShadows
                  position={[0, -1.3, 0]}
                  opacity={0.5}
                  scale={10}
                  blur={2}
                  far={5}
                />
                {/* Help Text */}
                <Text
                  position={[0, 0.95, 0.8]}
                  color={"#020873"}
                  anchorX={"center"}
                  anchorY={"middle"}
                  fontSize={0.065}
                >
                  Puedes usar W,A,S,D para rotar y acercar/alejar el modelo
                </Text>
                <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
              </Suspense>
            </Canvas>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} >
          <div className="disease-text-definition p-4">
            <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>
              Síntomas comunes de la miopía
            </h2>
            <p>
              Reconocer estos signos temprano ayuda a buscar solución a tiempo. La miopía suele manifestarse con:
            </p>
            <ul>
              <li>
                <strong>Dificultad para ver de lejos:</strong><br />
                Letreros, pantallas de cine o rostros a distancia parecen "desenfocados".
              </li>
              <li>
                <strong>Entrecerrar los ojos habitualmente:</strong><br />
                Es un gesto automático para intentar enfocar mejor.
              </li>
              <li>
                <strong>Dolores de cabeza frecuentes:</strong><br />
                Sobre todo después de actividades que requieren mirar lejos (conducir, clases en pizarra).
              </li>
              <li>
                <strong>Cansancio ocular:</strong><br />
                Sensación de pesadez en los ojos al final del día, especialmente tras usar pantallas.
              </li>
              <li>
                <strong>Problemas en actividades cotidianas:</strong><br />
                Dificultad para leer matrículas, seguir pelotas en deportes o identificar detalles en paisajes.
              </li>
            </ul>
            <p className="mt-3">
              <small>¿Notas varios de estos síntomas? Una revisión visual sencilla puede confirmarlo.</small>
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
}