import React, { useRef } from 'react'
import { SpotLight, SoftShadows, useHelper } from '@react-three/drei'
import { DirectionalLightHelper, SpotLightHelper } from 'three';

export default function Lights() {
  return (
    <>
    <hemisphereLight
        skyColor="#ffcba4"
        groundColor="#444444"
        intensity={0.6}
    />
    <directionalLight
        castShadow
        position={[-5, 5, 5]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffcc88"
    />
    </>
  )
}