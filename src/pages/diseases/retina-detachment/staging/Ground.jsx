// src/components/staging/Ground.jsx
import { Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Trees from '../models-3d/Tree'; // Importaremos el nuevo componente

// Hacemos estas constantes exportables o las definimos donde sean accesibles para Trees
export const TERRAIN_SIZE_X = 200;
export const TERRAIN_SIZE_Z = 200;
export const TERRAIN_DISPLACEMENT_SCALE = 10; // La misma que usa abajo
export const TERRAIN_BASE_Y = 0; // La posición Y base del plano

export default function Ground() {
  const colorTexture = useTexture('/textures/Grass004_1K-JPG_Color.jpg');
  if (colorTexture) {
    colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(20, 20);
    colorTexture.anisotropy = 16;
    colorTexture.colorSpace = THREE.SRGBColorSpace;
  }

  const displacementTexture = useTexture('/textures/RollingHillsHeightMap.png');
  if (displacementTexture) {
    displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
    displacementTexture.repeat.set(1, 1);
    displacementTexture.anisotropy = 16;
    // No es necesario colorSpace para displacement/height maps si son lineales
  }

  return (
    <>
      <Plane
        args={[
          TERRAIN_SIZE_X,
          TERRAIN_SIZE_Z,
          128,
          128,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, TERRAIN_BASE_Y, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color="#627449"
          map={colorTexture}
          displacementMap={displacementTexture}
          displacementScale={TERRAIN_DISPLACEMENT_SCALE}
          roughness={0.9}
          metalness={0.1}
        />
      </Plane>
      {/* Solo renderiza los árboles si el displacementMap está cargado */}
      {displacementTexture && displacementTexture.image && (
        <Trees
          count={100} // Número de árboles
          terrainSizeX={TERRAIN_SIZE_X}
          terrainSizeZ={TERRAIN_SIZE_Z}
          terrainBaseY={TERRAIN_BASE_Y}
          displacementMap={displacementTexture}
          displacementScale={TERRAIN_DISPLACEMENT_SCALE}
        />
      )}
    </>
  );
}