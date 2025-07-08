import { useSpring, a } from '@react-spring/three'
import React, { useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import Text from "../texts/Text"
import {  useKeyboardControls } from '@react-three/drei'
import { DepthOfField, EffectComposer,  ChromaticAberration } from '@react-three/postprocessing'

export function Girl(props) {
  const { nodes, materials } = useGLTF('/models-3d/cataracts/girl.glb')

  const [showGlasses, setShowGlasses] = useState(false)
  const [glassesAnimationTime, setGlassesAnimationTime] = useState(0)
  const [subscribeKeys, getKeys] = useKeyboardControls() //Events
  const [textContent, setTextContent] = useState("¡Haz clic y presiona s!")

  const spring = useSpring({
    scale: showGlasses ? 1 : 0.001,
    opacity: showGlasses ? 1 : 0,
    config: { tension: 120, friction: 14 },
  })

  const glassesGroupRef = useRef()
  const groupRef = useRef()

  const [showClouds, setShowClouds] = useState(false)
  const targetCameraPos = useRef(null)
  const { camera } = useThree()
  const initialCameraPos = useRef(camera.position.clone())
  const [animationGirl, setAnimationGirl] = useState(true)

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // if (e.key === 'g' && showGlasses) {
  //     //   setGlassesAnimationTime(2.5)
  //     // }

  //     if (e.key === 's' || e.key === 'S') {
  //       targetCameraPos.current = new THREE.Vector3(0, 0.2, -0.3)
  //       setShowClouds(true)
  //       setAnimationGirl(false)
  //     }

  //     if (e.key === 'n' || e.key === 'N') {
  //       targetCameraPos.current = initialCameraPos.current.clone()
  //       setShowClouds(false)
  //       setAnimationGirl(true)
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => window.removeEventListener('keydown', handleKeyDown)
  // }, [showGlasses])

  useFrame((state, delta) => {
    const { Return, symptom } = getKeys()

    if (Return) {
        targetCameraPos.current = initialCameraPos.current.clone()
        setShowClouds(false)
        setAnimationGirl(true)
        setTextContent("¡Haz clic y presiona s!")
    }

    if (symptom) {
        targetCameraPos.current = new THREE.Vector3(0, 0.2, -0.3)
        setShowClouds(true)
        setAnimationGirl(false)
        setTextContent("Presiona n para volver")
    }

    if (groupRef.current && animationGirl) {
        const t = state.clock.elapsedTime
        groupRef.current.rotation.y = Math.sin(t * 1.5) * 0.2
    }

    if (glassesGroupRef.current && glassesAnimationTime > 0) {
      const t = state.clock.elapsedTime
      glassesGroupRef.current.rotation.y = Math.sin(t * 10) * 0.1
      setGlassesAnimationTime((prev) => Math.max(prev - delta, 0))
    } else if (glassesGroupRef.current) {
      glassesGroupRef.current.rotation.y *= 0.9
    }

    if (targetCameraPos.current) {
      camera.position.lerp(targetCameraPos.current, 0.09)
      camera.lookAt(0, 0, 0) // Ajusta a donde mirar
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null} onClick={() => { if (!showGlasses) {setShowGlasses(true)}}}>
      <mesh
        castShadow
        geometry={nodes.Hairband.geometry}
        material={materials.Hairband}
      />
      <mesh castShadow geometry={nodes.Body.geometry} material={materials.Body} />
      
      <a.group ref={glassesGroupRef} scale={spring.scale} visible={showGlasses}>
        <mesh
            castShadow
            geometry={nodes.Glasses.geometry}
            material={materials.Glasses}
        />

        <mesh
            castShadow
            geometry={nodes.GlassesFrame.geometry}
            material={materials.GlassesFrame}
        />
      </a.group>
      
      <mesh castShadow geometry={nodes.Bow.geometry} material={materials.Bow} />
      {/* <mesh receiveShadow geometry={nodes.Base.geometry} material={materials.Base} /> */}
      <mesh
        castShadow
        geometry={nodes.Eyebrows.geometry}
        material={materials.Eyelashes}
      />
      <mesh
        castShadow
        geometry={nodes.Eyelashes.geometry}
        material={materials.Eyelashes}
      />
      
      <mesh castShadow geometry={nodes.Hair.geometry} material={materials.Hair} />

      <Text textContent={textContent} />

      {showClouds && (
        <>
        <EffectComposer>
          <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
          <ChromaticAberration offset={[0.005, 0.003]} />
          
        </EffectComposer>
        </>
      )}
    </group>
  )
}

useGLTF.preload('/models-3d/cataracts/girl.glb')