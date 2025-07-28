/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PositionalAudio } from "@react-three/drei";
import { Row, Col } from "react-bootstrap";
import PreventionLights from "../Lights/PreventionLights.jsx";
import { LuRotate3D } from "react-icons/lu";
import { TouchingEyes } from "../model-3d/TouchingEyes";
import { ForbiddenSign } from "../model-3d/ForbiddenSign.jsx";
import PreventionStaging from "../staging/PreventionStaging.jsx";
import PreventionText from "../texts/PreventionText.jsx";
import InfoButton from "../Utils/InfoButton/InfoButton.jsx";

export default function PreventionTab() {
  const audioRef = useRef();
  const xPressed = useRef(false); // Agregar estado para controlar si X ya está presionada

  useEffect(() => {
    console.log("PreventionTab mounted, audioRef:", audioRef.current);
    
    const handleKeyDown = (e) => {
      // Solo procesar si X no estaba ya presionada (evitar repeticiones)
      if ((e.key === "x" || e.key === "X") && !xPressed.current) {
        console.log("Key pressed for first time:", e.key);
        const audio = audioRef.current;
        console.log("Audio ref:", audio);
        
        if (audio) {
          console.log("X pressed, audio found:", audio);
          xPressed.current = true; // Marcar que X está presionada
          
          if (audio.isPlaying) {
            console.log("Audio is playing, stopping...");
            audio.stop();
          }
          console.log("Playing audio...");
          audio.play();
        }
      }
    };

    const handleKeyUp = (e) => {
      if ((e.key === "x" || e.key === "X") && xPressed.current) {
        console.log("Key released:", e.key);
        const audio = audioRef.current;
        xPressed.current = false; // Marcar que X ya no está presionada
        
        if (audio && audio.isPlaying) {
          console.log("X released, stopping audio...");
          audio.stop();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      console.log("PreventionTab unmounting, removing listeners");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Fallback para errores del Suspense
  const ErrorFallback = ({ error }) => (
    <div>Error loading 3D scene: {error.message}</div>
  );

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6}>
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon">
              <LuRotate3D title="Modelo 3D" />
            </div>
            {/* Botones en la esquina superior derecha */}
            {/* Botones en la esquina superior izquierda */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 2,
                display: "flex",
                gap: 8,
              }}
            >
              <InfoButton
                buttonLabel=""
                iconClass="bi bi-info-circle-fill"
                infoText={"¡¡¡ No presiones X, no debes tocarte los ojos!!!"}
              />
            </div>
            <Canvas 
              camera={{ position: [0, -2, 0.5], fov: 30 }} 
              shadows
              onError={(error) => console.error("Canvas error:", error)}
            >
              <Suspense 
                fallback={
                  <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="gray" />
                  </mesh>
                }
              >
                <PreventionLights />
                <PreventionStaging />
                <PreventionText
                  title="Evita tocarte la cara"
                  posX={0.03}
                  posY={0.55}
                  posZ={-0.5}
                />  
                <TouchingEyes position={[0, -1.58, 0]} />
                <ForbiddenSign position={[0, 0, 0.4]} scale={0.3} />
                
                {/* Audio posicional para el modelo TouchingEyes */}
                <PositionalAudio
                  ref={audioRef}
                  url="/sounds/alarmConjunctivitis.mp3"
                  distance={3}
                  loop={false}
                  volume={0.8}
                  position={[0, -1.58, 0]} // Misma posición que TouchingEyes
                  onLoad={() => console.log("Audio loaded successfully")}
                  onError={(error) => console.error("Audio error:", error)}
                />
                
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
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              Prevencion y Autocuidado
            </h2>
            <p>
              La conjuntivitis es una inflamación de la membrana que recubre el
              ojo y el párpado, y puede ser causada por virus, bacterias,
              alergias o agentes irritantes. Para prevenirla:
            </p>
            <ul style={{ marginBottom: "1rem" }}>
              <li>Lava tus manos con frecuencia y evita tocarte los ojos.</li>
              <li>No compartas toallas, maquillaje ni artículos personales.</li>
              <li>
                Mantén limpios tus lentes de contacto y sigue las indicaciones
                de uso.
              </li>
              <li>
                Si tienes síntomas como enrojecimiento, picazón o secreción
                ocular, consulta al médico y evita el contacto cercano con otras
                personas.
              </li>
            </ul>
            <p>
              El autocuidado y la higiene son claves para evitar el contagio y
              la propagación de esta afección.
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
}