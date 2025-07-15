/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Row, Col } from 'react-bootstrap';
import PreventionModel from '../model-3d/PreventionModel.jsx';
import PreventionStaging from '../Staging/PreventionStaging.jsx';
import PreventionModelLights from '../Lights/PreventionModelLights.jsx';
import InfoButton from '../Utils/InfoButton/InfoButton.jsx';
export default function PreventionTab() {
  // Tips para mostrar al interactuar con el modelo
  const tips = [
    '¡Recuerda parpadear seguido cuando uses pantallas!',
    'Descansa la vista cada 20 minutos mirando a lo lejos.',
    'La luz natural es tu aliada: aprovecha el día.',
    'No te acerques demasiado a los libros o pantallas.',
    '¡Haz actividades al aire libre siempre que puedas!'
  ];
  const [showTip, setShowTip] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Handler para mostrar un tip aleatorio al hacer click en el modelo
  const handleModelClick = () => {
    setTipIndex(Math.floor(Math.random() * tips.length));
    setShowTip(true);
    setTimeout(() => setShowTip(false), 3500);
  };
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = '';
  };

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6} >
          <div className="desease-canvas-wrapper position-relative">
            {/* Botón de info en la esquina superior izquierda */}
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, display: 'flex', gap: 8 }}>
              <InfoButton buttonLabel="" iconClass="bi bi-info-circle-fill">
                Haz click sobre el modelo para ver consejos de prevención de la miopía.
              </InfoButton>
            </div>
            <Canvas camera={{ position: [0, 0.5, 2.5] }} shadows>
              <Suspense fallback={null}>
                <PreventionModelLights />
                <PreventionStaging />
                <PreventionModel
                  position={[0, 0, 0]}
                  scale={15}
                  onClick={handleModelClick}
                  onPointerOver={handlePointerOver}
                  onPointerOut={handlePointerOut}
                />
                {/* Tip flotante al hacer click */}
                {showTip && (
                  <Html
                    position={[2.2, -1.2, 0]}
                    style={{
                      pointerEvents: 'none',
                      fontSize: 15,
                      color: '#222',
                      background: 'rgba(255,255,255,0.85)',
                      borderRadius: 6,
                      padding: '7px 14px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      fontWeight: 500,
                      border: '1px solid #ccc',
                      minWidth: 180,
                      maxWidth: 240,
                      textAlign: 'left',
                      position: 'absolute',
                      right: 20,
                      bottom: 20,
                      zIndex: 10
                    }}
                  >
                    <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      <i className="bi bi-lightbulb-fill" style={{ color: '#ffe066', fontSize: 18, marginRight: 8, verticalAlign: 'middle' }}></i>
                      {tips[tipIndex]}
                    </span>
                  </Html>
                )}
                {/* Sombra base */}
                <mesh rotation-x={-Math.PI / 2} receiveShadow position-y={-1.2}>
                  <circleGeometry args={[3.5, 32]} />
                  <meshStandardMaterial roughness={0.8} metalness={1} color="#e0e0e0" />
                </mesh>
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
            <p>
              La miopía es cada vez más común, pero ¡puedes proteger tu vista con hábitos sencillos! Aquí tienes recomendaciones fáciles de seguir para toda la familia:
            </p>
            <ul>
              <li><b>Hazte revisiones oculares</b> al menos una vez al año, aunque veas bien.</li>
              <li><b>Descansa tus ojos</b> cada 20 minutos si usas pantallas: mira a lo lejos y parpadea varias veces.</li>
              <li><b>Pasa tiempo al aire libre</b> todos los días, la luz natural ayuda a mantener tus ojos sanos.</li>
              <li><b>Evita leer o usar el móvil muy cerca</b> de tus ojos. Mantén una distancia cómoda.</li>
              <li><b>Usa buena iluminación</b> al leer, estudiar o trabajar.</li>
              <li><b>Cuida tu alimentación</b>: frutas, verduras y agua son aliados de tu salud visual.</li>
            </ul>
            <p style={{ marginTop: 16, color: '#1a237e', fontWeight: 500 }}>
              ¡Pequeños cambios pueden marcar una gran diferencia para tu vista!
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
}
