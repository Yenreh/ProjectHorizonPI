import React, { useRef, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";

export default function RetinaLight() {
  const directionalLightRef = useRef();
  const { scene } = useThree();

  // Muestra un helper visual para la luz
  // useHelper(directionalLightRef, DirectionalLightHelper, 1, "yellow");

  return (
    <>
      {/* Luz ambiental global muy suave */}
      <ambientLight intensity={0.3}/>

      {/* Luz tipo cielo y tierra, muy útil para interiores */}
      {/* <hemisphereLight
        groundColor={'#dddddd'} // luz desde abajo
        intensity={0.7}
      /> */}

      <directionalLight
        ref={directionalLightRef}
        color={'#ffffff'}
        intensity={0.8}
        position={[15, 0, 15]} // No exactamente vertical, para dar más "relieve" a las sombras
        target-position={[0, 0, 0]} // Que apunte al centro de tu escena
        castShadow
        shadow-mapSize-width={2048} // Subimos la resolución
        shadow-mapSize-height={2048}
        shadow-camera-near={0}
        shadow-camera-far={30}
        shadow-camera-left={-20}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-normalBias={0.05} // Evita artefactos tipo "acné" en sombras
      />

      {/* Luz puntual desde el centro del ojo hacia afuera */}
      <pointLight
        position={[0, 0, 0]} // centro del globo ocular
        intensity={2}
        distance={10}
        decay={2}
        color={'#ffffff'}

      />
    </>
  );
}
