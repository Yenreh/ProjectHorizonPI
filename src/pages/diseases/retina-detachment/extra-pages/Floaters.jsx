/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import GoldenGateHills from "../staging/GoldenGateHills"; // HDRI environment
import FloatingDots from "../effects/FloatingDots";
import Ground from "../staging/Ground"; // Importa el nuevo componente de suelo
import { useNavigate } from "react-router-dom";
import "./Floaters.css"; // Asegúrate que este CSS se actualice
import { useEffect, Suspense } from "react"; // Añadido Suspense
import { PlayerControls } from "../controls/PlayerControls";

export default function Floaters() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('canvas-fullscreen-active');
    return () => {
      document.body.classList.remove('canvas-fullscreen-active');
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    // Contenedor principal que necesita position: relative si los elementos fijos usan position: absolute
    // O simplemente pueden usar position: fixed para ser relativos al viewport.
    <div className="photopsia-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* Botón de Regreso - HTML estándar fuera del Canvas */}
      <div
        style={{
          position: 'fixed', // O 'absolute' si photopsia-container es el referente
          top: '20px',
          left: '20px',
          zIndex: 200, // z-index más alto que el canvas, pero menor que el prompt de PlayerControls si es necesario
        }}
      >
        <button
          onClick={handleGoBack}
          className="back-button-drei"
          style={{ pointerEvents: 'auto' }} // Asegura que sea clickeable
        >
          ← Volver
        </button>
      </div>

      {/* Leyenda - HTML estándar fuera del Canvas */}
      <div
        style={{
          position: 'fixed', // O 'absolute'
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          textAlign: 'center',
          color: 'white',
          // pointerEvents: 'none', // Si el contenedor no debe ser interactivo
        }}
        className="info-legend-drei" 
      >
        {/* Clickeable o tenga hover, necesita pointerEvents: 'auto' */}
        <div style={{ pointerEvents: 'auto', padding: '10px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '5px' }}>
        Ver de repente muchas moscas flotantes puede ser una señal de desprendimiento de retina. Si aparecen de golpe, especialmente con destellos de luz o pérdida de visión, es importante ir al oftalmólogo cuanto antes.
        </div>
      </div>

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.7, 10], fov: 75 }}
        shadows
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} // El canvas necesita estar "detrás" de los controles fijos
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        <Suspense fallback={null}>
          <GoldenGateHills />
          <Ground />
        </Suspense>
        
        <FloatingDots />
        
        <PlayerControls />
      </Canvas>
    </div>
  );
}