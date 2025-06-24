import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function SlitLamp(props, isRotating) {
  const { nodes, materials } = useGLTF('/models-3d/retina-detachment/optimized-slit-lamp.glb')

  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += delta * 0.3; // Ajusta la velocidad de rotación aquí
    }
  });

  return (
    <group {...props} dispose={null} ref={meshRef}>
      <mesh
        name="SlitLamp"
        castShadow
        receiveShadow
        geometry={nodes.SlitLamp.geometry}
        material={materials.SlitLampMaterial}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/retina-detachment/optimized-slit-lamp.glb')
