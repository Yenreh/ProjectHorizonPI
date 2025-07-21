import React from "react";
import { Environment } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three"; // Importar THREE para Vector3

/**
 * Componente para el entorno 3D estático del quiz.
 * Incluye luces, suelo y paredes.
 */
export function Environment3D() {
  return (
    <>
      {/* Luces de la escena */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={new THREE.Vector3(10, 15, 5)}
        castShadow
        intensity={1.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight position={new THREE.Vector3(0, 10, 8)} color="#fbbf24" intensity={0.4} />
      <spotLight
        position={new THREE.Vector3(0, 15, -5)}
        angle={0.3}
        penumbra={0.2}
        intensity={0.8}
        castShadow
      />
      <Environment preset="night" />
    </>
  );
}

/**
 * Componente para el suelo físico de la escena.
 */
export function Suelo() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={new THREE.Vector3(0, -1, 0)} receiveShadow>
        <boxGeometry args={[30, 2, 20]} />
        <meshStandardMaterial
          color="#2d3748"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </RigidBody>
  );
}

/**
 * Componente para las paredes físicas de la escena.
 */
export function Paredes() {
  return (
    <>
      <RigidBody type="fixed" position={new THREE.Vector3(0, 2, -8)} colliders="cuboid">
        <mesh>
          <boxGeometry args={[20, 6, 1]} />
          <meshStandardMaterial color="#4a5568" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={new THREE.Vector3(-12, 2, 0)} colliders="cuboid">
        <mesh>
          <boxGeometry args={[1, 6, 20]} />
          <meshStandardMaterial color="#4a5568" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={new THREE.Vector3(12, 2, 0)} colliders="cuboid">
        <mesh>
          <boxGeometry args={[1, 6, 20]} />
          <meshStandardMaterial color="#4a5568" transparent opacity={0.3} />
        </mesh>
      </RigidBody>
    </>
  );
}
