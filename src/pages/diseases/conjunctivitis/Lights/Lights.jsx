import { useRef } from 'react'
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three';

export default function Lights() {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, DirectionalLightHelper);

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight 
        position={[0, 10, 12]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={0.001}
      />
    </>
  )
}