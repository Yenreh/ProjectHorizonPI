import React, { useRef, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";


export default function VitrectomyLight() {
    const directionalLightRef = useRef();
    const { scene } = useThree();
    
      // Muestra un helper visual para la luz
    useHelper(directionalLightRef, DirectionalLightHelper, 1, "blue");

    return (
    <>
      <ambientLight color={"#F5F5DC"} intensity={2} />
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[0, 5, 5]}
        intensity={5}
        castShadow={true}
      />
    </>
    );
};
