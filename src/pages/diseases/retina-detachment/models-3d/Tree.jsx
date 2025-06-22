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
      return []; // Aún no está cargada la textura de desplazamiento
    }

    const canvas = document.createElement('canvas');
    const image = displacementMap.image;
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d', { willReadFrequently: true }); // willReadFrequently puede mejorar rendimiento
    context.drawImage(image, 0, 0);

    const trees = [];
    for (let i = 0; i < count; i++) {
      // Posición X, Z aleatoria dentro de los límites del terreno
      const x = (Math.random() - 0.5) * terrainSizeX;
      const z = (Math.random() - 0.5) * terrainSizeZ;

      // Convertir coordenadas del mundo (x,z) a coordenadas UV de la textura (0-1)
      // El origen del plano está en (0,0) en su espacio local,
      // que se mapea a (0.5, 0.5) en UV si no hay repetición de textura de desplazamiento.
      // Si displacementMap.repeat está en (1,1), entonces:
      const u = (x / terrainSizeX) + 0.5;
      const v = (z / terrainSizeZ) + 0.5; // O 1.0 - ((z / terrainSizeZ) + 0.5) dependiendo de la orientación del heightmap

      // Asegurarse de que u,v estén en [0,1]
      const uClamped = Math.max(0, Math.min(1, u));
      const vClamped = Math.max(0, Math.min(1, v));

      // Convertir coordenadas UV a coordenadas de píxel de la imagen
      const pixelX = Math.floor(uClamped * (image.width -1)); // -1 porque los índices van de 0 a width-1
      const pixelY = Math.floor(vClamped * (image.height -1));

      // Obtener el valor del píxel (R, G, o B, ya que es escala de grises)
      // getImageData devuelve un array [R, G, B, A, R, G, B, A, ...]
      const pixelData = context.getImageData(pixelX, pixelY, 1, 1).data;
      const grayscaleValue = pixelData[0]; // R, G y B serán iguales

      // Calcular la altura Y del terreno en esa posición
      const terrainHeight = (grayscaleValue / 255) * displacementScale + terrainBaseY;

      // Dimensiones aleatorias para los árboles para más variedad
      const trunkHeight = 2 + Math.random() * 3; // Altura del tronco entre 2 y 5
      const canopyRadius = 1 + Math.random() * 1.5; // Radio de la copa entre 1 y 2.5

      trees.push({
        id: i,
        position: [x, terrainHeight, z], // El árbol se planta en la superficie del terreno
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