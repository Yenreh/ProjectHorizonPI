// PhotopsiaFlashes.jsx
import React, { useRef, useMemo, useEffect, Suspense, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Función para rangos aleatorios
const randomRange = (min, max) => Math.random() * (max - min) + min;

function Flash({
  // Estas propiedades vienen de PhotopsiaFlashes y definen los rangos para este flash
  flashDurationRange, // [minVisibleTime, maxVisibleTime]
  spawnIntervalRange, // [minTimeBetweenSpawns, maxTimeBetweenSpawns]
  sizeRange,          // [minSize, maxSize]
  areaWidth,          // Ancho del área de aparición
  areaHeight,         // Alto del área de aparición
  distance,           // Distancia fija desde la cámara
  baseColor = [255, 255, 220], // Color base del flash (RGB)
}) {
  const groupRef = useRef();

  // Estado React para forzar re-renderizado cuando cambian propiedades visuales
  const [isVisible, setIsVisible] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({
    opacity: 0,
    width: 0,
    height: 0,
    blur: 2,
    backgroundColor: `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0)`,
  });
  const [currentPosition, setCurrentPosition] = useState(new THREE.Vector3());

  // useRef para manejar la lógica interna del flash sin causar re-renderizados innecesarios por cada frame
  const flashLogic = useRef({
    active: false,
    lifetime: 0, // Duración del flash actual
    age: 0,      // Edad del flash actual
    nextSpawnIn: randomRange(spawnIntervalRange[0], spawnIntervalRange[1]), // Tiempo hasta la próxima aparición
    currentSize: 0,
    currentOpacity: 0,
  });

  useFrame((_, delta) => {
    const logic = flashLogic.current;

    if (logic.active) {
      logic.age += delta;

      // Lógica de opacidad y brillo
      // Aparece rápido, se mantiene y se desvanece rápido
      const lifeRatio = logic.age / logic.lifetime;
      let newOpacity;
      if (lifeRatio < 0.1) { // Fade in
        newOpacity = lifeRatio / 0.1;
      } else if (lifeRatio < 0.8) { // Stay bright
        newOpacity = 1.0;
      } else { // Fade out
        newOpacity = Math.max(0, 1 - (lifeRatio - 0.8) / 0.2);
      }
      logic.currentOpacity = newOpacity;


      if (logic.age >= logic.lifetime) {
        logic.active = false;
        logic.currentOpacity = 0;
        logic.age = 0;
        logic.nextSpawnIn = randomRange(spawnIntervalRange[0], spawnIntervalRange[1]);
        setIsVisible(false); // Actualiza estado React
      }
    } else {
      logic.nextSpawnIn -= delta;
      if (logic.nextSpawnIn <= 0) {
        logic.active = true;
        logic.currentOpacity = 0; // Empezará en 0 y el fade in lo subirá
        logic.age = 0;
        logic.lifetime = randomRange(flashDurationRange[0], flashDurationRange[1]);
        logic.currentSize = randomRange(sizeRange[0], sizeRange[1]);

        // Nueva posición aleatoria para el flash
        const x = randomRange(-areaWidth / 2, areaWidth / 2);
        const y = randomRange(-areaHeight / 2, areaHeight / 2);
        const z = -distance;
        
        setCurrentPosition(new THREE.Vector3(x, y, z)); // Actualiza estado React
        setIsVisible(true); // Actualiza estado React
      }
    }

    // Actualiza el estilo solo si hay cambios o si está activo
    if (logic.active || currentStyle.opacity !== 0) {
      const newBlur = logic.currentOpacity > 0.5 ? randomRange(1, 3) : 2; // Un poco de parpadeo en el blur
      setCurrentStyle({
        opacity: logic.currentOpacity,
        width: logic.currentSize,
        height: logic.currentSize * randomRange(0.3, 1.0), // Para formas un poco más alargadas/irregulares
        blur: newBlur,
        // Usar un gradiente radial para un efecto de destello más suave
        backgroundColor: `radial-gradient(circle, rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${logic.currentOpacity * 0.8}) 0%, rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${logic.currentOpacity * 0.4}) 40%, rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},0) 75%)`,
      });
    }
  });
  
  if (!isVisible && currentStyle.opacity === 0) {
    return null; // No renderizar nada si no es visible y ya se desvaneció
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group ref={groupRef} position={currentPosition}>
      <Html
        center
        transform
        occlude={false} // Los flashes no deben ser ocluidos fácilmente
        wrapperClass="photopsia-flash"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          // Opacity se maneja en el div interno a través de `currentStyle.backgroundColor`
        }}
      >
        <div
          style={{
            width: `${currentStyle.width}px`,
            height: `${currentStyle.height}px`,
            borderRadius: '50%', // Puede ser '10px 50%' para formas más alargadas
            background: currentStyle.backgroundColor, // El gradiente ya incluye la opacidad
            filter: `blur(${currentStyle.blur}px) brightness(1.2)`, // Un poco más brillante
            transition: 'opacity 0.05s linear, width 0.05s linear, height 0.05s linear', // Suavizar cambios rápidos
          }}
        />
      </Html>
    </group>
  );
}


export default function PhotopsiaFlashes({
  count = 10,           // Número de "emisores" de flashes. No todos estarán activos a la vez.
  areaWidth = 10,
  areaHeight = 7,
  distance = 2.5,        // Distancia a la cámara (local Z negativo)
  flashDurationRange = [0.1, 0.5], // Segundos que un flash es visible [min, max]
  spawnIntervalRange = [0.2, 3.0], // Segundos entre apariciones de un *mismo* emisor [min, max]
  sizeRange = [20, 70],  // Píxeles [min, max]
}) {
  const { camera } = useThree();
  const groupRef = useRef();

  useEffect(() => {
    const group = groupRef.current;
    if (group) {
      camera.add(group);
      group.position.set(0, 0, 0);
      group.quaternion.identity();
      group.scale.set(1, 1, 1);
    }
    return () => {
      if (group) {
        camera.remove(group);
      }
    };
  }, [camera]);

  const flashesData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      // Pasamos los rangos y dimensiones para que cada Flash los use internamente
      flashDurationRange,
      spawnIntervalRange,
      sizeRange,
      areaWidth,
      areaHeight,
      distance,
    }));
  }, [count, flashDurationRange, spawnIntervalRange, sizeRange, areaWidth, areaHeight, distance]);

  return (
    <Suspense fallback={null}>
      <group ref={groupRef}>
        {flashesData.map(flashProps => (
          <Flash key={flashProps.id} {...flashProps} />
        ))}
      </group>
    </Suspense>
  );
}