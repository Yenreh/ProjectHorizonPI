/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export default function PreventionModelLights() {
  const dirLightRef = useRef();
  const fillLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dirLightRef.current) {
      dirLightRef.current.position.x = MathUtils.lerp(-1.5, 1.5, (Math.sin(t) + 1) / 2);
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = 0.7 + Math.abs(Math.sin(t * 0.5)) * 0.3;
    }
  });

  return (
    <>
      {/* Luz ambiental fría, simulando consultorio */}
      <ambientLight intensity={0.9} color="#eaf6ff" />
      {/* Luz principal suave, como ventana grande */}
      <directionalLight
        ref={dirLightRef}
        color="#e0f7fa"
        position={[0, 4, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.001}
      />
      {/* Luz de relleno, simula lámpara de consultorio */}
      <pointLight
        ref={fillLightRef}
        color="#b3e5fc"
        position={[-2, 2, 2]}
        intensity={0.9}
        distance={8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.002}
      />
    </>
  );
}
