/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Object3D } from "three";

export default function TreatmentSecondLights({ mode = 1 }) {
  const dirLightRef = useRef();
  const spotLightRef = useRef();
  const spotTarget = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (mode === 1 && dirLightRef.current) {
      dirLightRef.current.position.x = MathUtils.lerp(
        -0.5,
        0.5,
        (Math.sin(t * 0.5) + 1) / 2
      );
    }

    if (mode === 2 && spotLightRef.current && spotTarget.current) {
      // Movimiento cenital muy pequeño
      const radius = 0.15;
      spotLightRef.current.position.x = Math.sin(t * 0.3) * radius;
      spotLightRef.current.position.z = Math.cos(t * 0.3) * radius;
      spotLightRef.current.position.y = 10;
      spotTarget.current.position.set(0, 0, 0);
      spotLightRef.current.target = spotTarget.current;
      spotLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {mode === 1 && (
        <>
          <ambientLight intensity={1.3} color="#e0e0ff" />
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
          <ambientLight intensity={2} />
          <spotLight
            ref={spotLightRef}
            position={[0, 10, 0]}
            angle={Math.PI / 4}
            penumbra={0.3}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={0.01}
          />
          {/* El target debe ser un objeto 3D en la escena */}
          <primitive object={new Object3D()} ref={spotTarget} />
        </>
      )}
    </>
  );
}
