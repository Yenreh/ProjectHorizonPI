/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Row, Col } from 'react-bootstrap';
import { Model as TreatmentModel } from '../model-3d/TreatmentModel.jsx';

export default function TreatmentTab() {
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6} >
          <div className="desease-canvas-wrapper">
            <Canvas camera={{ position: [0, 0.5, 2.5] }} shadows>
              <Suspense fallback={null}>
                <TreatmentModel position={[0, 0, 0]} />
              </Suspense>
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} >
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>
              Opciones de Tratamiento
            </h2>
            <p>Información sobre gafas, lentes de contacto y cirugía...</p>
            <p>El tratamiento adecuado depende de la edad, estilo de vida y grado de miopía.</p>
          </div>
        </Col>
      </Row>
    </section>
  );
}
