import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import  SceneCloudy  from '../staging/Cloudy'
import  NotCloudy  from '../staging/NotCloudy'
import Staging from '../staging/Staging'
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'

export function Glasses(props) {
  const { nodes, materials } = useGLTF('/models-3d/cataracts/glasses.glb')
  const [nublado, setNublado] = useState('normal')
  const { camera } = useThree()
  const initialCameraPos = useRef(camera.position.clone())
  const targetCameraPos = useRef(null)
  const groupRef = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls() //Events

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === 's' || e.key === 'S') {
  //       setNublado('cloudy')
  //       targetCameraPos.current = new THREE.Vector3(0, 0, -3.5) 
  //     }
  //     if (e.key === 't' || e.key === 'T') {
  //       setNublado('notCloudy')
  //       targetCameraPos.current = new THREE.Vector3(0, -0.5, -1.5) 
  //     }
  //     if (e.key === 'n' || e.key === 'N') {
  //       setNublado('normal')
  //       targetCameraPos.current = initialCameraPos.current.clone()
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => window.removeEventListener('keydown', handleKeyDown)
  // }, [])

  useFrame(() => {
    const { Return, symptom, treatments } = getKeys()

    if (Return) {
      setNublado('normal')
      targetCameraPos.current = initialCameraPos.current.clone()
    }

    if (symptom) {
      setNublado('cloudy')
      targetCameraPos.current = new THREE.Vector3(0, 0, -3.5) 
    }

    if (treatments) {
      setNublado('notCloudy')
      targetCameraPos.current = new THREE.Vector3(0, -0.5, -1.5) 
    }

  })

  useFrame(() => {
    if (targetCameraPos.current) {
      camera.position.lerp(targetCameraPos.current, 0.05)
      camera.lookAt(0, 0, 0)
    }
  })

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.2
  })

  return (
    <group {...props} dispose={null} scale={[4, 4, 4]}>

      <group ref={groupRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Temples.geometry}
          material={materials.Bridge}
        />
        <mesh
          castShadow
          geometry={nodes.TempleTip.geometry}
          material={materials.Frame}
        />

        <mesh castShadow receiveShadow geometry={nodes.Lens.geometry}  
          onClick={() => {
            setNublado('normal');
            targetCameraPos.current = initialCameraPos.current.clone();
          }}
        >
            <meshPhysicalMaterial
              transparent={true}
              opacity={0.3}
              roughness={0.2}
              metalness={0}
              thickness={0.5}
              ior={1.2}
              color="#cce6ff"
            />
        </mesh>

        <mesh castShadow receiveShadow geometry={nodes.Frame.geometry} material={materials.Frame} />
        <mesh castShadow receiveShadow geometry={nodes.Bridge.geometry} material={materials.Bridge} />
      </group>
      
      <group position={nodes.Lens.position}>
        {nublado === 'cloudy' && <SceneCloudy />}
        {nublado === 'notCloudy' && <NotCloudy />}
        {nublado === 'normal' && <Staging />}
      </group>

    </group>
  )
}

useGLTF.preload('/models-3d/cataracts/glasses.glb')
