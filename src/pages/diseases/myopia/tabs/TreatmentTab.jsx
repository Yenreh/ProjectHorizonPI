/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows } from '@react-three/drei';
import { Row, Col } from 'react-bootstrap';
import { Model as TreatmentModel } from '../model-3d/TreatmentModel.jsx';
import TreatmentModelLights from '../Lights/TreatmentModelLights.jsx';
import TreatmentStaging from '../Staging/TreatmentStaging.jsx';
import InfoButton from '../Utils/InfoButton/InfoButton.jsx';
import RotateButton from '../Utils/RotateButton/RotateButton.jsx';
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
              <RotateButton onClick={() => setRotating((r) => !r)} isRotating={rotating} />
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
            <ul style={{ marginBottom: '1rem' }}>
              <li><strong>Gafas:</strong> Son la forma más común y sencilla de ver bien si tienes miopía.</li>
              <li><strong>Lentes de contacto:</strong> Pequeños lentes que se colocan en el ojo y pueden ser más cómodos para hacer deporte o actividades diarias.</li>
              <li><strong>Operación láser:</strong> Una cirugía rápida que puede ayudar a dejar de usar gafas o lentes de contacto.</li>
              <li><strong>Cuidados y revisiones:</strong> Es importante ir al oculista de vez en cuando para revisar que todo esté bien y que la miopía no avance.</li>
              <li><strong>Para niños y jóvenes:</strong> Hay tratamientos especiales, como gotas o lentes especiales, que pueden ayudar a que la miopía no aumente tan rápido.</li>
              <li><strong>Nuevas opciones:</strong> Cada vez hay más soluciones y tecnologías para ver mejor y cuidar tus ojos.</li>
            </ul>
            <p>El mejor tratamiento depende de cada persona. Lo más importante es consultar con un especialista para encontrar la opción que más se adapte a ti y a tu estilo de vida.</p>
          </div>
        </Col>
      </Row>
    </section>
  );
}
