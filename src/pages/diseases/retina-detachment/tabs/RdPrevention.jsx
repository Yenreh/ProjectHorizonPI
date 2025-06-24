import { Canvas } from "@react-three/fiber";
import { Col, Row } from "react-bootstrap";
import * as THREE from "three";
import HospitalTwo from "../staging/HospitalTwo";
import SceneContent from "../utils/SceneContent";
import { Suspense, useState } from "react";
// import './RdPrevention.css'

// Información de los objetos
const EQUIPMENT_INFO = {
  ophthalmoscope: {
    id: "ophthalmoscope",
    name: "Oftalmoscopio",
    description: "El oftalmoscopio es un instrumento utilizado para examinar el fondo del ojo, incluyendo la retina, el disco óptico, la coroides y los vasos sanguíneos. Es crucial para diagnosticar enfermedades oculares como el glaucoma, la degeneración macular y la retinopatía diabética.",
    initialPosition: [-2.5, 0, -0.5],
    focusOffset: new THREE.Vector3(0, 0.5, 7),
    scale: [0.6,0.6,0.6]
  },
  slitlamp: {
    id: "slitlamp",
    name: "Lámpara de Hendidura",
    description: "La lámpara de hendidura es un microscopio binocular de alta potencia con una fuente de luz intensa que puede enfocarse como una rendija delgada. Permite un examen detallado de las estructuras frontales del ojo (córnea, iris, cristalino) y también del fondo de ojo con lentes especiales. Esencial para detectar cataratas, uveítis, y lesiones corneales.",
    initialPosition: [2.5, 0, 0.5],
    focusOffset: new THREE.Vector3(0, 1, 8),
    scale: [0.5,0.5,0.5]
  },
};

const OVERVIEW_CAMERA_POSITION = new THREE.Vector3(0, 2.5, 10);

export default function RdPrevention() {
  const [selectedObjectKey, setSelectedObjectKey] = useState(null);

  const handleObjectSelect = (key) => {
    setSelectedObjectKey(key);
  };

  const handleGoBackOverview = () => {
    setSelectedObjectKey(null);
  };

  const selectedInfo = selectedObjectKey ? EQUIPMENT_INFO[selectedObjectKey] : null;

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col md={6}>
          {/* El contenedor del canvas necesita position: relative para que el panel de info se posicione correctamente */}
          <div 
            className="desease-canvas-wrapper" 
            style={{ 
              height: "600px", 
              border: "1px solid #ddd", 
              position: "relative", // IMPORTANTE para el posicionamiento absoluto del panel de info
              overflow: "hidden" // Para que el panel no se salga si es muy grande (opcional)
            }}
          >
            <Canvas
              shadows
              camera={{ position: OVERVIEW_CAMERA_POSITION.toArray(), fov: 50, near: 0.1, far: 1000 }}
              onPointerMissed={(event) => {
                  // Solo deseleccionar si el click es en el canvas y no en un objeto (y algo está seleccionado)
                  if (selectedObjectKey && event.target.tagName === 'CANVAS') {
                    // handleGoBackOverview(); // Descomentar si quieres que click en fondo deseleccione
                  }
              }}
            >
              <Suspense fallback={null}>
                <SceneContent 
                  onObjectSelect={handleObjectSelect} 
                  onGoBackOverview={handleGoBackOverview} // No lo usamos directamente en SceneContent pero podría ser útil
                  currentSelectedKey={selectedObjectKey}
                />
                <HospitalTwo />
              </Suspense>
            </Canvas>

            {/* Panel de Información HTML (fuera del Canvas) */}
            {selectedInfo && (
              <div 
                className="external-info-panel p-3" 
                style={{
                  position: 'absolute',
                  bottom: '20px', // Distancia desde abajo
                  left: '20px',   // Distancia desde la izquierda
                  maxWidth: '300px', // Ancho máximo
                  backgroundColor: 'rgba(255, 255, 255, 0.65)', // Fondo oscuro semitransparente
                  color: 'white', // Texto blanco
                  borderRadius: '8px',
                  zIndex: 10, // Para estar por encima del canvas
                  // pointerEvents: 'auto' // Ya no es necesario si está fuera y bien posicionado
                }}
              >
                <h4 className="mb-2" style={{ color: '#87CEFA' /* LightSkyBlue, o tu var(--color-accent) */ }}>
                  {selectedInfo.name}
                </h4>
                <p style={{fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '15px'}}>
                  {selectedInfo.description}
                </p>
                <button 
                  className="btn btn-sm btn-light" // Botón con fondo claro
                  onClick={handleGoBackOverview}
                  style={{fontSize: '0.8rem'}}
                >
                  Cerrar Información
                </button>
              </div>
            )}
          </div>
        </Col>
        <Col md={6}>
          <div className="desease-text-definition p-4">
            {/* ... tu contenido HTML de la derecha ... */}
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              Prevención
            </h2>
            <p>
              Aunque no siempre se puede evitar, hay algunas formas de reducir
              el riesgo y cuidar mejor de tu visión:
            </p>
            <ul>
              <li>
                <strong>Hazte chequeos visuales regularmente:</strong>{" "}
                Especialmente si usas lentes, tienes miopía alta o antecedentes
                familiares. Un examen puede detectar problemas antes de que
                causen síntomas.
              </li>
              <li>
                <strong>No ignores señales extrañas:</strong> Si ves luces,
                sombras o muchas “moscas volantes”, acude al oftalmólogo. Podría
                ser una alerta temprana.
              </li>
              <li>
                <strong>Protege tus ojos de golpes fuertes:</strong> Usa gafas
                protectoras si practicas deportes de contacto o trabajas en
                entornos peligrosos.
              </li>
              <li>
                <strong>Controla enfermedades crónicas:</strong> Diabetes,
                hipertensión y otras condiciones pueden afectar los ojos. Un
                buen control reduce complicaciones.
              </li>
              <li>
                <strong>Evita frotarte los ojos con fuerza:</strong> Aunque
                parezca inofensivo, podría causar tracción sobre la retina si ya
                tienes predisposición.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
}