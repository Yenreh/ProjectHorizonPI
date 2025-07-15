import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function FaceEye(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models-3d/conjunctivitis/faceEye.glb");

  useFrame((state) => {
    if (group.current) {
      const movement = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      // Suma el movimiento a la rotación Y que le pasas por props
      group.current.rotation.y = (props.rotation?.[1] || 0) + movement;
      // Si quieres que X y Z también sean controlables:
      group.current.rotation.x = props.rotation?.[0] || 0;
      group.current.rotation.z = props.rotation?.[2] || 0;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={materials.Material_0}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/conjunctivitis/faceEye.glb");
