import React, { useRef } from 'react'
import { SpotLight, SoftShadows, useHelper } from '@react-three/drei'
import { DirectionalLightHelper, SpotLightHelper } from 'three';

export default function Lights() {
  return (
    <>
    <hemisphereLight
        skyColor="#b1e1ff"
        groundColor="#444444"
        intensity={0.6}
    />
    <directionalLight
        castShadow
        position={[2, 5, 5]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
    />
    </>
  )
}