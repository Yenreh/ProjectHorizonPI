// VisualCurtain.jsx
import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Helper para convertir color de array/string a array RGB
const parseColor = (colorInput) => {
  if (Array.isArray(colorInput) && colorInput.length === 3) {
    return colorInput;
  }
  if (typeof colorInput === 'string') {
    if (colorInput.startsWith('#')) {
      const hex = colorInput.substring(1);
      const bigint = parseInt(hex, 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    if (colorInput.startsWith('rgb')) {
      const parts = colorInput.match(/(\d+)/g);
      if (parts && parts.length >= 3) {
        return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])];
      }
    }
  }
  return [0, 0, 0]; // Default to black
};


export default function VisualCurtain({
  direction = 'top', // 'top', 'bottom', 'left', 'right', 'center-static' (for scotoma)
  extent = 0.5,      // 0.0 to 1.0 - How much of the view is covered from that direction
  opacity = 0.85,    // 0.0 to 1.0 - Opacidad de la cortina
  color = [10, 10, 10], // Color de la cortina (RGB array or hex string)
  softness = 0.2,    // 0.0 to 1.0 - Suavidad del borde (0 = borde duro, 1 = muy suave)
  distance = 2,      // Distancia a la cámara (local Z negativo)
  areaWidth = 10,    // Ancho del "área de visión" de referencia en unidades del mundo
  areaHeight = 7,    // Alto del "área de visión" de referencia
  // Factor para convertir unidades del mundo a píxeles para el estilo HTML.
  // Esto es un poco de "magia" porque Html con transform escala elementos.
  // Necesitamos píxeles grandes para que el gradiente tenga suficiente resolución.
  worldToPixelRatio = 100,
}) {
  const { camera } = useThree();
  const groupRef = useRef(); // Grupo principal anclado a la cámara

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

  const rgbColor = useMemo(() => parseColor(color), [color]);

  // Calculamos el estilo y la posición del elemento HTML
  const curtainProps = useMemo(() => {
    const baseStyle = {
      pointerEvents: 'none',
      userSelect: 'none',
      position: 'absolute', // Necesario si el Html wrapper no es el curtain mismo
      // Este backgroundColor es un fallback o la parte sólida del gradiente
      backgroundColor: `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacity})`,
    };

    const gradColorStart = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacity})`;
    const gradColorEnd = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 0)`;

    // El gradiente se extiende sobre `softPercentage` del tamaño del elemento
    const softPercentage = Math.max(0.01, Math.min(1, softness)) * 100; // Clamp entre 1% y 100%
    const hardStopPercentage = 100 - softPercentage;

    let computedStyle = { ...baseStyle };
    // La posición del Html es relativa al groupRef (que está en el origen de la cámara)
    let htmlPosition = [0, 0, -distance];
    
    // El tamaño del elemento HTML. Usamos worldToPixelRatio para darle "resolución"
    // antes de que `transform` en `<Html>` lo escale.
    let htmlWidthPx = areaWidth * worldToPixelRatio;
    let htmlHeightPx = areaHeight * worldToPixelRatio;


    switch (direction) {
      case 'top':
        htmlHeightPx = areaHeight * extent * worldToPixelRatio;
        computedStyle.width = `${areaWidth * worldToPixelRatio}px`; // Ocupa todo el ancho del área
        computedStyle.height = `${htmlHeightPx}px`;
        computedStyle.background = `linear-gradient(to bottom, ${gradColorStart} ${hardStopPercentage}%, ${gradColorEnd} 100%)`;
        // El centro del Html debe estar en: Y_area_top - (Height_html / 2)
        // Y_area_top es areaHeight / 2 (si el origen del area es 0,0)
        // Height_html_world es areaHeight * extent
        htmlPosition[1] = (areaHeight / 2) * (1 - extent);
        break;
      case 'bottom':
        htmlHeightPx = areaHeight * extent * worldToPixelRatio;
        computedStyle.width = `${areaWidth * worldToPixelRatio}px`;
        computedStyle.height = `${htmlHeightPx}px`;
        computedStyle.background = `linear-gradient(to top, ${gradColorStart} ${hardStopPercentage}%, ${gradColorEnd} 100%)`;
        htmlPosition[1] = -(areaHeight / 2) * (1 - extent);
        break;
      case 'left':
        htmlWidthPx = areaWidth * extent * worldToPixelRatio;
        computedStyle.width = `${htmlWidthPx}px`;
        computedStyle.height = `${areaHeight * worldToPixelRatio}px`;
        computedStyle.background = `linear-gradient(to right, ${gradColorStart} ${hardStopPercentage}%, ${gradColorEnd} 100%)`;
        htmlPosition[0] = -(areaWidth / 2) * (1 - extent);
        break;
      case 'right':
        htmlWidthPx = areaWidth * extent * worldToPixelRatio;
        computedStyle.width = `${htmlWidthPx}px`;
        computedStyle.height = `${areaHeight * worldToPixelRatio}px`;
        computedStyle.background = `linear-gradient(to left, ${gradColorStart} ${hardStopPercentage}%, ${gradColorEnd} 100%)`;
        htmlPosition[0] = (areaWidth / 2) * (1 - extent);
        break;
      case 'center-static': // Simula un escotoma central o una mancha oscura
        // extent aquí podría interpretarse como el radio/diámetro relativo al menor entre areaWidth/areaHeight
        const scotomaDiameterWorld = Math.min(areaWidth, areaHeight) * extent;
        htmlWidthPx = scotomaDiameterWorld * worldToPixelRatio;
        htmlHeightPx = scotomaDiameterWorld * worldToPixelRatio;

        computedStyle.width = `${htmlWidthPx}px`;
        computedStyle.height = `${htmlHeightPx}px`;
        computedStyle.borderRadius = '50%'; // Para hacerlo circular
        // Para un escotoma, el centro es opaco y se desvanece hacia afuera
        computedStyle.background = `radial-gradient(ellipse at center, ${gradColorStart} ${hardStopPercentage}%, ${gradColorEnd} 100%)`;
        // La posición ya es el centro por defecto [0,0,-distance]
        break;
      default:
        // Un rectángulo oscuro en el centro si la dirección no es reconocida
        htmlWidthPx = areaWidth * extent * worldToPixelRatio;
        htmlHeightPx = areaHeight * extent * worldToPixelRatio;
        computedStyle.width = `${htmlWidthPx}px`;
        computedStyle.height = `${htmlHeightPx}px`;
        break;
    }
    
    // Asegurar que el style siempre tenga width y height por si alguna rama no los setea
    if (!computedStyle.width) computedStyle.width = `${areaWidth * worldToPixelRatio}px`;
    if (!computedStyle.height) computedStyle.height = `${areaHeight * worldToPixelRatio}px`;


    return {
      style: computedStyle,
      position: new THREE.Vector3(...htmlPosition),
    };
  }, [direction, extent, opacity, rgbColor, softness, distance, areaWidth, areaHeight, worldToPixelRatio]);

  return (
    <Suspense fallback={null}>
      <group ref={groupRef}>
        <Html
          center        // El origen del Html es su centro
          transform     // Permite que el Html se escale y posicione en el mundo 3D
          occlude={false} // La cortina no debe ser ocluida por objetos 3D
          position={curtainProps.position} // Posición del centro del Html en el espacio del groupRef
          // No necesitamos un div interno, el propio Html será la cortina
          style={curtainProps.style}
        />
      </group>
    </Suspense>
  );
}