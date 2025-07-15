import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EyeDropsBottle(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/conjunctivitis/EyeDropsBottle.glb"
  );
  const { actions, mixer } = useAnimations(animations, group);

  console.log(animations);
  // Estados para animación 'retirar'
  const [atFinal, setAtFinal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Movimiento suave de lado a lado
  useFrame((state) => {
    if (group.current) {
      // Movimiento de lado a lado usando seno
      const movement = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.02;
      group.current.rotation.y += movement;
    }
  });

  // Animación 'retirar' con flechas
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!actions || !actions.retirar || isPlaying) return;
      const action = actions.retirar;
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;

      // ESTADO INICIAL
      if (!atFinal && event.key === "ArrowRight") {
        setIsPlaying(true);
        action.reset();
        action.timeScale = 1;
        action.play();

        // Usar setTimeout para detectar cuando termina la animación
        const duration = action.getClip().duration;
        setTimeout(() => {
          setIsPlaying(false);
          setAtFinal(true);
        }, duration * 1000);
      }
      // ESTADO FINAL
      else if (atFinal && event.key === "ArrowLeft") {
        setIsPlaying(true);
        action.reset();
        action.timeScale = -1;
        action.play();
        action.time = action.getClip().duration;

        // Usar setTimeout para detectar cuando termina la animación
        const duration = action.getClip().duration;
        setTimeout(() => {
          setIsPlaying(false);
          setAtFinal(false);
        }, duration * 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions, atFinal, isPlaying]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="EyeDropsBottle"
          geometry={nodes.EyeDropsBottle.geometry}
          material={materials.CylinderMaterial}
        >
          <mesh
            name="BlueCap"
            geometry={nodes.BlueCap.geometry}
            material={materials.BlueMaterial}
            position={[0, 0.033, 0]}
            rotation={[0, 0.955, 0]}
          />
          <mesh
            name="BlueRing"
            geometry={nodes.BlueRing.geometry}
            material={materials.BlueMaterial}
            position={[0, 0.023, 0]}
          />
          <mesh
            name="Cover"
            geometry={nodes.Cover.geometry}
            material={materials.CoverMaterial}
            position={[0, 0.04, 0]}
          />
          <mesh
            name="Label"
            geometry={nodes.Label.geometry}
            material={materials.LabelMaterial}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/EyeDropsBottle.glb");
