/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows } from '@react-three/drei';
import { Row, Col } from 'react-bootstrap';
import { Model as TreatmentModel } from '../model-3d/TreatmentModel.jsx';
import TreatmentModelLights from '../Lights/TreatmentModelLights.jsx';
import TreatmentStaging from '../Staging/TreatmentStaging.jsx';
import InfoButton from '../Utils/InfoButton/InfoButton.jsx';
import { LuRotate3D } from "react-icons/lu";

export default function TreatmentTab() {
  const [showInfo, setShowInfo] = useState(false);
  const [rotating, setRotating] = useState(false);

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6} >
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon"> 
              <LuRotate3D title="Modelo 3D" />
            </div>
            {/* Botones en la esquina superior derecha */}
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, display: 'flex', gap: 8 }}>
              <InfoButton buttonLabel="" iconClass="bi bi-info-circle-fill">
                Usa el mouse para interactuar con el modelo 3D. ¡Haz click en el botón de girar del modelo para rotarlo!
              </InfoButton>
              <button
                onClick={() => setRotating((r) => !r)}
                style={{ background: '#5c6bc0', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4em 1em', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {rotating ? 'Detener giro' : 'Girar modelo'}
              </button>

            </div>
            <Canvas camera={{ position: [0, 0.5, 2.5] }} shadows>
              <Suspense fallback={null}>
                <TreatmentStaging mode={1} />
                <TreatmentModelLights mode={1} rotating={rotating} />
                <TreatmentModel position={[0, 0, 0]}  scale={15} rotating={rotating} />
                
                {/* Sombra */}
                <mesh rotation-x={-Math.PI / 2} receiveShadow position-y={-1.2}>
                  <circleGeometry args={[3.5, 32]} />
                  <meshStandardMaterial roughness={0.7} metalness={0.8} color="#e0e0e0" />
                </mesh>
                {/* Eliminado el texto 3D */}
                <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
              </Suspense>
            </Canvas >
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} >
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>
              Opciones de Tratamiento
            </h2>
            <p>
              <strong>Gafas:</strong> Corrigen la visión de lejos de forma sencilla y segura.<br />
              <strong>Lentes de contacto:</strong> Alternativa estética y práctica para muchas personas.<br />
              <strong>Cirugía refractiva:</strong> Opciones como LASIK pueden reducir o eliminar la dependencia de gafas/lentes.
            </p>
            <p>El tratamiento adecuado depende de la edad, estilo de vida y grado de miopía.</p>
          </div>
        </Col>
      </Row>
    </section>
  );
}
