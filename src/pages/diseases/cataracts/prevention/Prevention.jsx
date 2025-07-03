import React, { Suspense } from "react";
import "../Cataracts.css";
import "../../Desease.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vegetable } from "./model-3d/Vegetable";
import { LuRotate3D } from "react-icons/lu";
import Staging from "./staging/Staging";
import Lights from "./Lights/Lights";
import TextVegetable from "./texts/TextVegetable";
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import TextHtmlPrevention from "./texts/TextHtmlPrevention";

export default function Prevention() {
  return (
      <div className="content">
        <div className="diagram-section">
          <div className="desease-canvas-wrapper position-relative">
            <div className="position-absolute bottom-0 end-0 p-2 desease-canvas-icon"> 
              <LuRotate3D title="Modelo 3D" />
            </div>
            <Canvas camera={{ position: [-0.05, 0.2, 2.5]}} shadows>
            <KeyboardControls
              map={[
                { name: 'hear', keys: ['e', 'E'] },
              ]}
            >
              <TextHtmlPrevention />
              <Staging />
              <Suspense fallback={null}>
                <Lights />
                <TextVegetable />
                <Vegetable position={[0, -0.5, 0.5]}/>

              </Suspense>
              <OrbitControls
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
                minDistance={2}
                maxDistance={10}
              />
            </KeyboardControls>
            </Canvas>
          </div>
        </div>        
        <div className="info-section">
          <h2 className="mb-3" style={{ color: 'var(--color-2)' }}>Prevención y Cuidados</h2>
          <section>
            <p>
              Aunque no siempre es posible prevenir completamente la aparición de cataratas, ciertos hábitos saludables pueden ayudar a retrasar su desarrollo y proteger la salud ocular a largo plazo.
            </p>

            <h4>Protección contra la radiación UV</h4>
            <p>
              Usar gafas de sol con protección 100% contra rayos UVA y UVB ayuda a reducir el daño acumulativo que la luz ultravioleta puede causar en el cristalino.
            </p>

            <h4>Alimentación rica en antioxidantes</h4>
            <p>
              Consumir frutas y verduras con alto contenido en vitaminas C y E, luteína y zeaxantina contribuye a mantener una buena salud ocular. Estos nutrientes ayudan a combatir el estrés oxidativo que puede afectar al cristalino.
            </p>


            <h4>Revisiones oftalmológicas periódicas</h4>
            <p>
              Realizar exámenes de la vista con regularidad permite detectar cualquier signo temprano de catarata y tomar decisiones oportunas sobre su manejo.
            </p>
          </section>



        </div>
      </div>
  );
}