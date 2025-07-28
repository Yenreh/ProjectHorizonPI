/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// src/components/staging/Trees.jsx
import React, { useMemo } from 'react';
import * as THREE from 'three';

// Un componente simple para un árbol individual
function Tree({ position, trunkHeight, canopyRadius }) {
  return (
    <group position={position}>
      {/* Tronco */}
      <mesh castShadow position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.3, 0.5, trunkHeight, 8]} /> {/* radioSup, radioInf, altura, segmentosRadiales */}
        <meshStandardMaterial color="#755f41" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Copa */}
      <mesh castShadow position={[0, trunkHeight + canopyRadius * 0.8, 0]}>
        <sphereGeometry args={[canopyRadius, 8, 6]} /> {/* radio, segmentosAncho, segmentosAlto */}
        <meshStandardMaterial color="#4f783e" roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function Trees({
  count,
  terrainSizeX,
  terrainSizeZ,
  terrainBaseY,
  displacementMap,
  displacementScale,
}) {
  // Memoizamos el cálculo de las posiciones de los árboles
  // para que solo se recalcule si cambian las props relevantes.
const treeData = useMemo(() => {
  if (!displacementMap || !displacementMap.image) {
    return [];
  }

  const canvas = document.createElement('canvas');
  const image = displacementMap.image;
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  
  // Obtén los datos de TODOS los píxeles de una sola vez
  const allPixelData = context.getImageData(0, 0, image.width, image.height).data;

  const trees = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * terrainSizeX;
    const z = (Math.random() - 0.5) * terrainSizeZ;

    const u = (x / terrainSizeX) + 0.5;
    const v = 0.5 - (z / terrainSizeZ); // Con la corrección aplicada

    const uClamped = Math.max(0, Math.min(1, u));
    const vClamped = Math.max(0, Math.min(1, v));

    const pixelX = Math.floor(uClamped * (image.width - 1));
    const pixelY = Math.floor(vClamped * (image.height - 1));

    // Calcula el índice en el array de datos de píxeles
    // Cada píxel ocupa 4 bytes (R, G, B, A)
    const pixelIndex = (pixelY * image.width + pixelX) * 4;
    const grayscaleValue = allPixelData[pixelIndex]; // Solo necesitamos el valor R

    const terrainHeight = (grayscaleValue / 255) * displacementScale + terrainBaseY;

    const trunkHeight = 2 + Math.random() * 3;
    const canopyRadius = 1 + Math.random() * 1.5;

    trees.push({
      id: i,
      position: [x, terrainHeight, z],
      trunkHeight,
      canopyRadius,
    });
  }
  return trees;
}, [count, terrainSizeX, terrainSizeZ, terrainBaseY, displacementMap, displacementScale]);

  return (
    <>
      {treeData.map((tree) => (
        <Tree
          key={tree.id}
          position={tree.position}
          trunkHeight={tree.trunkHeight}
          canopyRadius={tree.canopyRadius}
        />
      ))}
    </>
  );
}