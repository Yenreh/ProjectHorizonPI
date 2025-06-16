import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {  useKeyboardControls } from '@react-three/drei'
import { PositionalAudio } from '@react-three/drei'

export function Vegetable(props) {
  const { nodes, materials } = useGLTF('/models-3d/cataracts/vegetable-shop.glb')

  const redPennantRef = useRef()
  const orangesRef = useRef()
  const [vegetableAnimationTime, setVegetableAnimationTime] = useState(2.5)
  const [subscribeKeys, getKeys] = useKeyboardControls() //Events
  const [clicked, setClicked] = useState(false)
  const soundRef = useRef()

  useFrame((state, delta) => {
    const { hear } = getKeys()
    if (clicked && orangesRef.current) {
      orangesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.06
    }
    redPennantRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.02

    if (hear) {
      soundRef.current.play()
    }
  })

  return (
    <group     
        onPointerOver={() => setClicked(true)}
        onPointerOut={() => setClicked(false)}
        {...props} dispose={null}>
        
        <PositionalAudio
        ref={soundRef}
        url="/sounds/cataracts.mp3"
        distance={5}         
        loop={false}
        autoplay={false}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Columns.geometry}
        material={materials.Columns}
      />
      <mesh castShadow receiveShadow geometry={nodes.Roof.geometry} material={materials.Roof} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BlueFlag.geometry}
        material={materials.BlueFlag}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GrayFlag.geometry}
        material={materials.GrayFlag}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BlueTent.geometry}
        material={materials.BlueTent}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BlueTentBack.geometry}
        material={materials.BlueTentBack}
      />
      <mesh          castShadow receiveShadow geometry={nodes.Apple.geometry} material={materials.Apple} />
      <mesh castShadow receiveShadow geometry={nodes.Pear.geometry} material={materials.Pear} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Eggplant.geometry}
        material={materials.Eggplant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EggplantStem.geometry}
        material={materials.EggplantStem}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EggplantTop.geometry}
        material={materials.EggplantTop}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Decoration.geometry}
        material={materials.Decoration}
      />
      <mesh castShadow receiveShadow geometry={nodes.Tomato.geometry} material={materials.Tomato} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TomatoTop.geometry}
        material={materials.TomatoTop}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GreenChili.geometry}
        material={materials.GreenChili}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ChiliStem.geometry}
        material={materials.ChilliStem}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RedChili.geometry}
        material={materials.RedChili}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Avocado.geometry}
        material={materials.Avocado}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AvocadoStem.geometry}
        material={materials.AvocadoStem}
      />
      <mesh castShadow receiveShadow geometry={nodes.Carrot.geometry} material={materials.Carrot} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CarrotTops.geometry}
        material={materials.CarrotTops}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pumpkin.geometry}
        material={materials.Pumpkin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PumpkinTop.geometry}
        material={materials.PumpkinTop}
      />
      <mesh castShadow receiveShadow geometry={nodes.Potato.geometry} material={materials.Potato} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cucumber.geometry}
        material={materials.Cucumber}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.YellowChilies.geometry}
        material={materials.YellowChilies}
      />
      <mesh
        ref={orangesRef} 
        castShadow
        receiveShadow
        geometry={nodes.NameShop.geometry}
        material={materials.NameShop}
      />
      <mesh  castShadow receiveShadow geometry={nodes.Cord.geometry} material={materials.Cord} />
      
      <group ref={redPennantRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowPennant.geometry}
          material={materials.YellowPennant}
        />
        <mesh
          
          castShadow
          receiveShadow
          geometry={nodes.RedPennant.geometry}
          material={materials.RedPennant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.GreenPennant.geometry}
          material={materials.GreenPennant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BluePennant.geometry}
          material={materials.BluePennant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PurplePennant.geometry}
          material={materials.PurplePennant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.OrangePennant.geometry}
          material={materials.OrangePennant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LightGreenPennant.geometry}
          material={materials.LightGreenPennant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.DarkGreenPennant.geometry}
          material={materials.DarkGreenPennant}
        />
      </group>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FruitBase.geometry}
        material={materials.FruitBase}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ShopBase.geometry}
        material={materials.ShopBase}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/cataracts/vegetable-shop.glb')