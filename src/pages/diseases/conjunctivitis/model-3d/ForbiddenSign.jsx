import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function ForbiddenSign(props) {
  const { nodes, materials } = useGLTF('/models-3d/conjunctivitis/prohibido.glb')
  const [isKeyPressed, setIsKeyPressed] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [animationScale, setAnimationScale] = useState(0.7)

  // Extraer la escala de las props para usarla como base
  const baseScale = props.scale || 1

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'x') {
        setIsKeyPressed(true)
      }
    }

    const handleKeyUp = (event) => {
      if (event.key.toLowerCase() === 'x') {
        setIsKeyPressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Animación suave
  useFrame((state, delta) => {
    if (isKeyPressed) {
      setOpacity(prev => Math.min(0.5, prev + delta * 3)) // Máximo 70% de opacidad
      setAnimationScale(prev => Math.min(1, prev + delta * 2))
    } else {
      setOpacity(prev => Math.max(0, prev - delta * 4))
      setAnimationScale(prev => Math.max(0.7, prev - delta * 2))
    }
  })

  // No renderizar si completamente transparente
  if (opacity === 0) {
    return null
  }

  // Clonar el material y modificar su opacidad
  const materialClone = materials['Material.001'].clone()
  materialClone.transparent = true
  materialClone.opacity = opacity

  // Combinar la escala base con la animación
  const finalScale = Array.isArray(baseScale) 
    ? baseScale.map(s => s * animationScale)
    : [baseScale * animationScale, baseScale * animationScale, baseScale * animationScale]

  return (
    <group {...props} dispose={null} scale={finalScale}>
      <mesh
        geometry={nodes.input.geometry}
        material={materialClone}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/conjunctivitis/prohibido.glb')