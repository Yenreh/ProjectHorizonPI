/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import GoldenGateHills from "../staging/GoldenGateHills";
import FloatingDots from "../effects/FloatingDots";
import PhotopsiaFlashes from "../effects/PhotopsiaFlashes";
import VisualCurtain from "../effects/VisualCurtain";
import BlurredVisionEffect from "../effects/BlurredVisionEffect";
import Ground from "../staging/Ground";
import { useNavigate } from "react-router-dom";
import "./Floaters.css";
import { useEffect, Suspense, useState } from "react"; // Añadido useState
import { PlayerControls } from "../controls/PlayerControls";

// Nuevos componentes (los crearemos más abajo)
import SymptomMenu from "./info-menus/SymptomMenu";
import SymptomDisplayInfo from "./info-menus/SymptomDisplayInfo";

// Definir constantes para los síntomas para evitar errores de tipeo
export const SYMPTOM_TYPES = {
  NONE: 'NONE', // Para cuando no hay ningún síntoma activo o se muestra info general
  FLOATERS: 'FLOATERS',
  PHOTOPSIA: 'PHOTOPSIA',
  CURTAIN: 'CURTAIN',
  BLURRED: 'BLURRED',
};

export default function Floaters() {
  const navigate = useNavigate();
  const [activeSymptom, setActiveSymptom] = useState(SYMPTOM_TYPES.NONE); // Inicialmente, info general
  const [controlsLocked, setControlsLocked] = useState(false); // Para saber si el usuario ya hizo clic para explorar

  useEffect(() => {
    document.body.classList.add('canvas-fullscreen-active');
    // Escuchar evento de liberación de cursor para potencialmente mostrar menú/info
    const handlePointerLockChange = () => {
      if (!document.pointerLockElement) {
        setControlsLocked(false); // Cursor liberado
      } else {
        setControlsLocked(true); // Cursor bloqueado
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange, false);
    return () => {
      document.body.classList.remove('canvas-fullscreen-active');
      document.removeEventListener('pointerlockchange', handlePointerLockChange, false);
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSymptomSelect = (symptom) => {
    setActiveSymptom(symptom);
    // Si el usuario selecciona un síntoma, asumimos que quiere ver la simulación.
    // Si los controles no están bloqueados, y selecciona un síntoma diferente a NONE,
  };

  const symptomDetails = {
    [SYMPTOM_TYPES.NONE]: {
      title: "Simulador de Desprendimiento de Retina",
      explanation: "Bienvenido al simulador de síntomas visuales del desprendimiento de retina. Selecciona un síntoma del menú de la izquierda para experimentarlo. ",
      instructions: "Haz clic en la pantalla para interactuar. Usa W, A, S, D para moverte y el RATÓN para mirar. Presiona ESC para liberar el ratón y acceder al menú.",
    },
    [SYMPTOM_TYPES.FLOATERS]: {
      title: "Miodesopsias (Moscas Volantes)",
      explanation: "Las miodesopsias son cuerpos flotantes que aparecen en el campo visual. Un aumento repentino en su número o tamaño puede ser un signo de desprendimiento de retina.",
      instructions: "Observa las partículas flotantes que se mueven con la mirada.",
    },
    [SYMPTOM_TYPES.PHOTOPSIA]: {
      title: "Fotopsias (Destellos de Luz)",
      explanation: "Las fotopsias son la percepción de destellos luminosos, como relámpagos, sin que exista un estímulo de luz externo. Son causados por la tracción del vítreo sobre la retina.",
      instructions: "Presta atención a los destellos de luz repentinos en tu campo visual.",
    },
    [SYMPTOM_TYPES.CURTAIN]: {
      title: "Escotoma (Cortina Negra)",
      explanation: "La aparición de una 'cortina' o sombra oscura que obstruye parte de la visión es un síntoma alarmante. Puede indicar que una porción de la retina se ha desprendido.",
      instructions: "Observa cómo una sombra oscura invade progresivamente tu visión.",
    },
    [SYMPTOM_TYPES.BLURRED]: {
      title: "Visión Borrosa",
      explanation: "Una pérdida súbita de la nitidez visual o visión borrosa generalizada puede ocurrir si el desprendimiento afecta la mácula, la parte central de la retina.",
      instructions: "Experimenta una pérdida general de la claridad y definición visual.",
    },
  };
  
  const currentSymptomDetail = symptomDetails[activeSymptom];

  return (
    <div className="photopsia-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1002, // Muy alto para estar sobre todo
        }}
      >
        <button
          onClick={handleGoBack}
          className="back-button-drei"
          style={{ pointerEvents: 'auto' }}
        >
          ← Volver (Presiona ESC para revelar el puntero)
        </button>
      </div>

      {/* Menú de Síntomas siempre visible o condicionalmente si el cursor está libre */}
      <SymptomMenu
        symptoms={SYMPTOM_TYPES}
        activeSymptom={activeSymptom}
        onSelectSymptom={handleSymptomSelect}
      />
      
      {/* Información del síntoma y/o instrucciones iniciales */}
      {/* Mostrar si los controles no están bloqueados, O si están bloqueados y se ha seleccionado un síntoma (para info persistente) */}
      {(!controlsLocked || activeSymptom !== SYMPTOM_TYPES.NONE) && (
        <SymptomDisplayInfo
          title={currentSymptomDetail.title}
          explanation={currentSymptomDetail.explanation}
          instructions={(!controlsLocked && activeSymptom === SYMPTOM_TYPES.NONE) ? symptomDetails[SYMPTOM_TYPES.NONE].instructions : currentSymptomDetail.instructions}
          isInitialPrompt={!controlsLocked && activeSymptom === SYMPTOM_TYPES.NONE}
        />
      )}
      

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.7, 10], fov: 75 }}
        shadows
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
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
        
        {/* Renderizado Condicional de Síntomas */}
        {activeSymptom === SYMPTOM_TYPES.FLOATERS && <FloatingDots />}
        
        {activeSymptom === SYMPTOM_TYPES.PHOTOPSIA && (
          <PhotopsiaFlashes
            count={15} areaWidth={12} areaHeight={8} distance={2}
            flashDurationRange={[0.05, 0.25]} spawnIntervalRange={[0.1, 4.0]}
            sizeRange={[30, 90]}
          />
        )}

        {activeSymptom === SYMPTOM_TYPES.CURTAIN && (
          <VisualCurtain
        direction="center-static"
        extent={0.15} // 15% del diámetro menor del área de visión
        opacity={0.95}
        color={[0,0,0]}
        softness={0.6}
        distance={1.2}
        areaWidth={3}
        areaHeight={10}
        worldToPixelRatio={200}
      />
        )}

        {activeSymptom === SYMPTOM_TYPES.BLURRED && (
          <BlurredVisionEffect
            focusDistance={0.0} focalLength={0.01} bokehScale={8}
          />
        )}

        {/* PlayerControls ya no necesita mostrar su propio prompt de HTML */}
        {/* Se le pasa setControlsLocked para que actualice el estado al bloquear/desbloquear */}
        <PlayerControls onLockStateChange={setControlsLocked} />
      </Canvas>
    </div>
  );
}