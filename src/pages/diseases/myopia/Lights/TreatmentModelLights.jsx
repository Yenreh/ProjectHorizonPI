/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export default function TreatmentModelLights({ mode = 1 }) {
  const dirLightRef = useRef();
  const spotLightRef = useRef();
  const pointLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mode === 1 && dirLightRef.current) {
      dirLightRef.current.position.x = MathUtils.lerp(-2, 2, (Math.sin(t) + 1) / 2);
    }
    if (mode === 2 && spotLightRef.current) {
      spotLightRef.current.target.position.x = Math.sin(t) * 2;
      spotLightRef.current.target.updateMatrixWorld();
    }
    if (mode === 3 && pointLightRef.current) {
      pointLightRef.current.position.y = 2 + Math.sin(t) * 0.5;
    }
  });

  return (
    <>
      {mode === 1 && (
        <>
          <ambientLight intensity={1.2} color="#e0e0ff" />
          <directionalLight
            ref={dirLightRef}
            color="#fffbe6"
            position={[0, 4, 4]}
            intensity={3}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.001}
          />
        </>
      )}
      {mode === 2 && (
        <>
          <ambientLight intensity={0.7} color="#f0f0f0" />
          <spotLight
            ref={spotLightRef}
            color="#ffeedd"
            position={[2, 5, 2]}
            angle={0.5}
            penumbra={0.5}
            intensity={4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.002}
          />
        </>
      )}
      {mode === 3 && (
        <>
          <ambientLight intensity={0.5} color="#e6f7ff" />
          <pointLight
            ref={pointLightRef}
            color="#aeefff"
            position={[0, 2, 3]}
            intensity={6}
            distance={10}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.003}
          />
        </>
      )}
    </>
  );
}
