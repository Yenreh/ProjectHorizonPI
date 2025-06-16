import React, { Suspense } from "react";
import "../Cataracts.css";
import "../../Desease.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Glasses } from "./model-3d/Glasses";
import Lights from "./Lights/Lights";
import { LuRotate3D } from "react-icons/lu";
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'

export default function Treatment() {
  return (
      <div className="content">
        <div className="diagram-section">
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon"> 
              <LuRotate3D title="Modelo 3D" />
            </div>
            <Canvas camera={{ position: [0, 0, 3]}} shadows>
            <KeyboardControls
              map={[
                { name: 'Return', keys: ['v', 'V'] },
                { name: 'symptom', keys: ['a', 'A'] },
                { name: 'treatments', keys: ['t', 'T'] },
              ]}
            >
               <Suspense fallback={null}>
                <Lights />
                <Glasses position={[0, -1, 0]}/>

              </Suspense>
              <OrbitControls enableZoom={false}/>             
            </KeyboardControls>

            </Canvas>
          </div>
        </div>        
        <div className="info-section">
          <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>Tratamiento</h2>
          <section>
            <p>
              El tratamiento depende del grado de afectación visual y del impacto en la calidad de vida del paciente.
            </p>

            <h4>Uso de gafas o lentes de aumento</h4>
            <p>
              En las etapas iniciales de la catarata, cuando la opacidad del cristalino es leve, es posible mejorar la visión mediante el uso de gafas con una nueva prescripción o lentes de aumento. Estos dispositivos ayudan a compensar la pérdida visual temporalmente.
            </p>

            <h4>Supervisión médica periódica</h4>
            <p>
              En casos donde la catarata no interfiere significativamente con la visión, se recomienda un seguimiento regular con el oftalmólogo para monitorear su evolución y detectar el momento adecuado para considerar otras opciones terapéuticas.
            </p>

            <h4>Cirugía de catarata</h4>
            <p>
              Cuando la catarata avanza y la pérdida visual afecta la calidad de vida, la cirugía es el tratamiento más efectivo y definitivo. Consiste en la extracción del cristalino opaco y la colocación de un lente intraocular (LIO) que restaura la visión. 
            </p>
          </section>


        </div>
      </div>
  );
}