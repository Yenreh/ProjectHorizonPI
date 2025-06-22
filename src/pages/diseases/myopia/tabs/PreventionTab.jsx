/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Row, Col } from 'react-bootstrap';
import { Model as PreventionModel } from '../model-3d/PreventionModel.jsx';

export default function PreventionTab() {
  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6} >
          <div className="desease-canvas-wrapper">
            <Canvas camera={{ position: [0, 0.5, 2.5] }} shadows>
              <Suspense fallback={null}>
                <PreventionModel position={[0, 0, 0]} />
              </Suspense>
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} >
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>
              Prevención y Cuidados
            </h2>
            <p>Consejos sobre hábitos saludables para la vista...</p>
            <ul>
              <li>Realizar exámenes oculares regulares.</li>
              <li>Limitar el tiempo frente a pantallas.</li>
              <li>Pasar tiempo al aire libre.</li>
              <li>Usar iluminación adecuada al leer o trabajar.</li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
}
