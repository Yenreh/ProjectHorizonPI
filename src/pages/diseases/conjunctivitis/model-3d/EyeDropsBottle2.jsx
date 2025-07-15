import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function EyeDropsBottle2(props) {
  const { activeScene, ...rest } = props;
  const group = useRef();

  try {
    const { nodes, materials, animations } = useGLTF(
      "/models-3d/conjunctivitis/EyeDropsBottle2.glb"
    );
    const { actions, mixer } = useAnimations(animations, group);

    console.log("EyeDropsBottle2 cargado exitosamente:", {
      hasNodes: !!nodes,
      hasMaterials: !!materials,
      animationsCount: animations?.length || 0,
    });

    const [isReady, setIsReady] = useState(false);

    // Debug: muestra las animaciones importadas
    useEffect(() => {
      if (animations) {
        console.log(
          "Animaciones disponibles:",
          animations.map((a) => a.name)
        );
        setIsReady(true);
      }
    }, [animations]);

    // Animación "gota" con clic izquierdo solo en escena 2
    useEffect(() => {
      const handleClick = (event) => {
        if (activeScene === 2 && actions && actions.gota && isReady) {
          console.log("Activando animación gota");

          // Detener la animación actual si está reproduciéndose
          if (actions.gota.isRunning()) {
            actions.gota.stop();
          }

          // Resetear y reproducir la animación
          actions.gota.reset();
          actions.gota.setLoop(THREE.LoopOnce, 1);
          actions.gota.clampWhenFinished = true;
          actions.gota.play();
        }
      };

      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }, [actions, activeScene, isReady]);

    return (
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="EyeDropsBottle2"
            geometry={nodes.EyeDropsBottle2.geometry}
            material={materials.CylinderMaterial}
          >
            <mesh
              name="BlueRing"
              geometry={nodes.BlueRing.geometry}
              material={materials.BlueMaterial}
            />
            <mesh
              name="Cover"
              geometry={nodes.Cover.geometry}
              material={materials.CoverMaterial}
            />
            <mesh
              name="Label"
              geometry={nodes.Label.geometry}
              material={materials.LabelMaterial}
            />
          </mesh>
          <group name="Drop" position={[0, 0.013, 0]}>
            <group name="Bottom" position={[0, -0.04, 0]} scale={[0, 1, 0]}>
              <mesh
                name="mesh_id27"
                geometry={nodes.mesh_id27.geometry}
                material={materials["75"]}
              />
              <mesh
                name="mesh_id27_1"
                geometry={nodes.mesh_id27_1.geometry}
                material={materials["77"]}
              />
            </group>
          </group>
        </group>
      </group>
    );
  } catch (error) {
    console.error("Error cargando EyeDropsBottle2:", error);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
}

useGLTF.preload("/models-3d/conjunctivitis/EyeDropsBottle2.glb");
