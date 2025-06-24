import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Ophthalmoscope(props) {
  const { nodes, materials } = useGLTF('/models-3d/retina-detachment/optimized-ophthalmoscope.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="SwitchMaterial"
        castShadow
        receiveShadow
        geometry={nodes.SwitchMaterial.geometry}
        material={materials.GrayMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="FilterSwitch"
        castShadow
        receiveShadow
        geometry={nodes.FilterSwitch.geometry}
        material={materials.GrayMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="RheostatPart2"
        castShadow
        receiveShadow
        geometry={nodes.RheostatPart2.geometry}
        material={materials.WhiteMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="RheostatPart3"
        castShadow
        receiveShadow
        geometry={nodes.RheostatPart3.geometry}
        material={materials.BlackMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="RheostatPart1"
        castShadow
        receiveShadow
        geometry={nodes.RheostatPart1.geometry}
        material={materials.BlackMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="Head"
        castShadow
        receiveShadow
        geometry={nodes.Head.geometry}
        material={materials.BlackMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="ViewingWindow"
        castShadow
        receiveShadow
        geometry={nodes.ViewingWindow.geometry}
        material={materials.CianMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="DiopterDial"
        castShadow
        receiveShadow
        geometry={nodes.DiopterDial.geometry}
        material={materials.GrayMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="ApertureDial"
        castShadow
        receiveShadow
        geometry={nodes.ApertureDial.geometry}
        material={materials.GrayMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="MetallicRings"
        castShadow
        receiveShadow
        geometry={nodes.MetallicRings.geometry}
        material={materials.WhiteMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        name="Handle"
        castShadow
        receiveShadow
        geometry={nodes.Handle.geometry}
        material={materials.HandleMaterial}
        rotation={[Math.PI, 0, Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/retina-detachment/optimized-ophthalmoscope.glb')
