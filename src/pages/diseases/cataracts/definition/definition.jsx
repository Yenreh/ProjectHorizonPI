import React, { Suspense } from "react";
import "../Cataracts.css";
import "../../Desease.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Eye } from "./model-3d/Eye";
import Lights from "./Lights/Lights";
import Title from "./texts/Title";
import { LuRotate3D } from "react-icons/lu";

export default function definition() {
  return (
      <div className="content">
        <div className="diagram-section">
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon"> 
              <LuRotate3D title="Modelo 3D" />
            </div>
            <Canvas camera={{ position: [0, 0.5, 3]}} shadows>
              <Suspense fallback={null}>
                <Title />
                <Lights />
                <Eye position={[-0.35, 0, 0]}/>

                <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[15, 15]} />
                  <shadowMaterial transparent opacity={0.3} />
                </mesh>

              </Suspense>
              <OrbitControls enableZoom={false}/>
            </Canvas>
          </div>
        </div>

        <div className="info-section">
          <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>¿Qué son?</h2>
          <p>
          Las cataratas oculares son una condición visual común que ocurre cuando el cristalino 
          del ojo se vuelve opaco o nublado. 
          Dificultando el paso de la luz y provocando una visión borrosa, descolorida o con destellos. 
          </p>
          <p>
          Las cataratas suelen desarrollarse de forma gradual con la edad, por causas genéticas, traumatismos, 
          enfermedades o el uso prolongado de ciertos medicamentos. 
          </p>
          <p>
          Sus principales efectos son:
          </p>
          <ul>
            <li>Disminución de la agudeza visual</li>
            <li>Aumento de la sensibilidad a la luz</li>
            <li>Fatiga visual y dolores de cabeza</li>
          </ul>
        </div>
      </div>
  );
}