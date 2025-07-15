/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row, Col } from "react-bootstrap";
import TreatmentLights from "../Lights/TreatmentLights.jsx";
import TreatmentStaging from "../staging/TreatmentStaging.jsx";
import TreatmentText from "../texts/TreatmentText.jsx";
import TreatmentSecondStaging from "../staging/TreatmentSecondStaging.jsx";
import InfoButton from "../Utils/InfoButton/InfoButton.jsx";
import ChangeButton from "../Utils/RotateButton/ChangeButton.jsx";
import { LuRotate3D } from "react-icons/lu";
import { EyeDropsBottle2 } from "../model-3d/EyeDropsBottle2.jsx";
import { EyeDropsBottle } from "../model-3d/EyeDropsBottle.jsx";
import { FaceEye } from "../model-3d/FaceEye.jsx";

export default function TreatmentTab() {
  const [showInfo, setShowInfo] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [activeScene, setActiveScene] = useState(1);

  return (
    <section className="desease-content py-4 px-md-3">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={12} lg={6}>
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon">
              <LuRotate3D title="Modelo 3D" />
            </div>
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
                infoText={
                  activeScene === 1
                    ? "Presiona:<br />➡️ - Retirar tapa <br />⬅️ - Poner tapa"
                    : "Presiona:<br />🖱️ Clic izquierdo - Aplicar gota "
                }
              />
              <ChangeButton
                activeScene={activeScene}
                onSceneChange={setActiveScene}
                buttonText={
                  activeScene === 1
                    ? "Haz clic para aprender cómo se utilizan las gotas"
                    : "Haz clic para visualizar el gotero"
                }
              />
            </div>
            {activeScene === 1 && (
              <Canvas camera={{ position: [3, 8, -10], fov: 13 }} shadows>
                <Suspense fallback={null}>
                  <TreatmentStaging />
                  <TreatmentLights mode={1} />
                  <EyeDropsBottle
                    position={[0, -0.6, 0]}
                    scale={35}
                    activeScene={activeScene}
                  />
                  {/* Sombra */}
                  <mesh
                    rotation-x={-Math.PI / 2}
                    receiveShadow
                    position-y={-1.2}
                  >
                    <circleGeometry args={[3.5, 32]} />
                    <meshStandardMaterial
                      roughness={0.7}
                      metalness={0.8}
                      color="#B3B2AE"
                    />
                  </mesh>
                  <OrbitControls
                    enableZoom={false}
                    enableRotate={true}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 4}
                    minPolarAngle={Math.PI / 4}
                  />
                </Suspense>
              </Canvas>
            )}
            {activeScene === 2 && (
              <>
                <Canvas camera={{ position: [-5, -3, 8], fov: 40 }} shadows>
                  <Suspense fallback={null}>
                    <TreatmentSecondStaging />
                    <TreatmentText
                      title="Agita bien las gotas antes de usarlas"
                      posX={-0.5}
                      posY={2}
                      posZ={-0.5}
                    />
                    <TreatmentLights mode={1} />
                    <EyeDropsBottle2
                      position={[2.2, 3.8, 1.8]}
                      scale={60}
                      rotation={[Math.PI, 0, 0]}
                      activeScene={activeScene}
                    />
                    <FaceEye
                      position={[4, -4, 0]}
                      scale={7.5}
                      rotation={[Math.PI / 2, (-3 * Math.PI) / 4, Math.PI / 2]}
                    />
                    {/* Sombra */}
                    <mesh
                      rotation-x={-Math.PI / 2}
                      receiveShadow
                      position-y={-1.2}
                    ></mesh>
                    <OrbitControls
                      enableZoom={false}
                      enableRotate={false}
                      enablePan={false}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 2}
                    />
                  </Suspense>
                </Canvas>
              </>
            )}
          </div>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <div className="desease-text-definition p-4">
            <h2 className="mb-3" style={{ color: "var(--color-2)" }}>
              Tratamiento
            </h2>
            <p>
              A continuación, se presentan algunas opciones para el tratamiento
              de la conjuntivitis, con el fin de orientar sobre las posibles
              medidas a tomar en estos casos. No obstante, es fundamental acudir
              a un profesional de la salud para recibir un diagnóstico y
              tratamiento adecuados.
            </p>
            <ul style={{ marginBottom: "1rem" }}>
              <li>
                <strong>Gotas antibióticas o antivirales:</strong> Son la opción
                más común si la conjuntivitis es causada por una infección
                bacteriana o viral. Ayudan a eliminar el agente que está
                provocando la inflamación.
              </li>
              <li>
                <strong>Gotas antiinflamatorias o antihistamínicas:</strong> Si
                la causa es una alergia, estas gotas ayudan a reducir la
                picazón, el enrojecimiento y la hinchazón de los ojos.
                actividades diarias.
              </li>
              <li>
                <strong>Compresas frías o calientes:</strong> Aplicar paños
                limpios sobre los ojos puede aliviar molestias como la picazón,
                el ardor o la hinchazón.
              </li>
              <li>
                <strong>Higiene ocular:</strong> Lavarse las manos
                frecuentemente y limpiar suavemente los ojos con agua tibia y
                gasas puede prevenir que la infección empeore o se propague.
              </li>
              <li>
                <strong>Evitar el uso de lentes de contacto:</strong> Durante el
                tratamiento, es mejor usar gafas para permitir que los ojos se
                recuperen y prevenir infecciones adicionales.
              </li>
              <li>
                <strong>Descanso y protección:</strong> Evitar pantallas por
                largos periodos y proteger los ojos del polvo o la luz intensa
                puede acelerar la recuperación.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </section>
  );
}
