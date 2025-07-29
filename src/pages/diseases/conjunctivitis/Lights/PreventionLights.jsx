import React, { useRef } from "react";
import { SpotLight } from "@react-three/drei";

export default function PreventionLights() {
  const spotRef = useRef();
  return (
    <>
      {/* Luz principal tipo SpotLight con sombras suaves */}
      <spotLight
        ref={spotRef}
        castShadow
        position={[0, 0.3, 4]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={0.1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.005}
        distance={15}
        color="#fffbe6"
        target-position={[0, -1.5, 0]}
      />
      {/* Luz ambiental suave para rellenar sombras */}
      <ambientLight intensity={0.3} />
    </>
  );
}
