/* eslint-disable react/prop-types */
// FloatingDots.jsx
import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Función para rangos aleatorios
const randomRange = (min, max) => Math.random() * (max - min) + min;

function Dot({ initialPosition, speedFactor, amplitude, size, offset }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const elapsedTime = clock.getElapsedTime();
      const driftX = Math.sin(elapsedTime * speedFactor + offset.x) * amplitude;
      const driftY = Math.cos(elapsedTime * speedFactor * 0.8 + offset.y) * amplitude;

      // Update position relative to the *parent group's* position (which follows the camera)
      groupRef.current.position.x = initialPosition.x + driftX;
      groupRef.current.position.y = initialPosition.y + driftY;
      groupRef.current.position.z = initialPosition.z; // Z is constant relative to parent
    }
  });

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group ref={groupRef} position={initialPosition}>
      <Html
        center
        transform
        occlude={false}
        wrapperClass="floater-dot"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(20, 20, 40, 0.65)',
            filter: 'blur(2px)',
          }}
        />
      </Html>
    </group>
  );
}


// --- Component to manage multiple dots ---
export default function FloatingDots({
  count = 150,
  areaWidth = 8,
  areaHeight = 6,
  distance = 3, // Distancia *en frente* del origen de la cámara
  sizeRange = [8, 20],
  speedRange = [0.05, 0.2],
  amplitudeRange = [0.1, 0.3],
}) {
  const { camera } = useThree(); // Camara
  const groupRef = useRef(); // Grupo que se ligara a la cmara

  // useEffect para adjuntar/desadjuntar el grupo a la cámara ---
  useEffect(() => {
    const group = groupRef.current;
    if (group) {
      // Asegurarse que el grupo empiece sin transformaciones relativas extrañas
      group.position.set(0, 0, 0);
      group.quaternion.identity(); // Usar identity() para resetear la rotación
      group.scale.set(1, 1, 1);

      // Añadir el grupo como hijo de la cámara
      camera.add(group);
      // console.log("FloatingDots group added to camera");
    }

    // Función de limpieza: Se ejecuta cuando el componente se desmonta
    return () => {
      if (group) {
        camera.remove(group);
        // console.log("FloatingDots group removed from camera");
      }
    };
  }, [camera]); // Ejecutar solo si la instancia de la cámara cambia

  // useMemo to generate dot data only once (sin cambios en la lógica interna)
  const dotsData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Posición RELATIVA AL GRUPO PADRE (que ahora está en el origen de la cámara)
      const x = randomRange(-areaWidth / 2, areaWidth / 2);
      const y = randomRange(-areaHeight / 2, areaHeight / 2);
      // Colocarlos en un plano *directamente en frente* del origen de la cámara (local Z negativo)
      const z = -distance;

      return {
        id: i,
        // Esta es la posición inicial *dentro* del grupo adjunto a la cámara
        initialPosition: new THREE.Vector3(x, y, z),
        speedFactor: randomRange(speedRange[0], speedRange[1]),
        amplitude: randomRange(amplitudeRange[0], amplitudeRange[1]),
        size: Math.floor(randomRange(sizeRange[0], sizeRange[1])),
        offset: {
          x: randomRange(0, Math.PI * 2),
          y: randomRange(0, Math.PI * 2),
        }
      };
    });
    // Asegúrate de que las dependencias sean correctas para regenerar si cambian los props
  }, [count, areaWidth, areaHeight, distance, sizeRange, speedRange, amplitudeRange]);


  return (
    // Este grupo será adjuntado programáticamente a la cámara via useEffect
    // Su posición/rotación será (0,0,0) relativo a la cámara.
    <Suspense fallback={<div>Loading...</div>}>
      <group ref={groupRef}>
        {/* Renderiza cada punto *dentro* del grupo adjunto a la cámara */}
        {/* La posición de cada Dot se establece relativa a este grupo */}
        {dotsData.map(dot => (
          <Dot key={dot.id} {...dot} />
        ))}
      </group>
    </Suspense>
  );
}