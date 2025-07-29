import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function TouchingEyes(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/conjunctivitis/touching-eyes.glb"
  );
  const { actions } = useAnimations(animations, group);

  const actionRef = useRef();
  const xPressed = useRef(false);
  const startFrame = 15; // Frame inicial al entrar
  const fps = 24;
  const startTime = startFrame / fps;
  const initialized = useRef(false);

  useEffect(() => {
    const action = actions && actions["TouchingEyesAnimation"];
    if (!action) return;
    actionRef.current = action;
    action.setLoop(2200, Infinity); // THREE.LoopRepeat
    action.clampWhenFinished = true;
    action.enabled = true;
    action.time = startTime;
    action.play(); // Asegura que la animación está activa
    action.paused = true; // Pero pausada en el frame 15
    initialized.current = false;
  }, [actions]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const action = actionRef.current;
      if ((e.key === "x" || e.key === "X") && !xPressed.current && action) {
        action.reset();
        action.time = startTime;
        action.play();
        action.paused = false;
        action.timeScale = 1;
        xPressed.current = true;
      }
    };
    const handleKeyUp = (e) => {
      const action = actionRef.current;
      if ((e.key === "x" || e.key === "X") && action) {
        xPressed.current = false;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state) => {
    const action = actionRef.current;
    if (!action) return;
    
    // Refuerzo: la primera vez que se renderiza, forzar frame 15
    if (!initialized.current) {
      action.paused = true;
      action.time = startTime;
      initialized.current = true;
    }
    
    if (xPressed.current) {
      if (!action.isRunning()) {
        action.reset();
        action.time = startTime;
        action.play();
      }
      action.paused = false;
      action.timeScale = 1;
    } else {
      if (action.isRunning()) {
        action.paused = true;
        action.time = startTime;
      }
      if (action.paused && Math.abs(action.time - startTime) > 0.01) {
        action.time = startTime;
      }
    }

    // Movimiento sutil de respiración solo cuando no se está presionando X
    if (group.current && !xPressed.current) {
      const breathingIntensity = 0.003; // Intensidad muy sutil
      const breathingSpeed = 1; // Velocidad de respiración
      const breathing = Math.sin(state.clock.elapsedTime * breathingSpeed) * breathingIntensity;
      
      // Aplicar el movimiento de respiración al grupo principal
      group.current.scale.y = (props.scale || 1) * (1 + breathing);
      group.current.position.y = (props.position?.[1] || 0) + breathing * 0.5;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="TouchingEyes"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.0113}
        >
          <skinnedMesh
            castShadow
            receiveShadow
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            castShadow
            receiveShadow
            name="Eyelashes"
            geometry={nodes.Eyelashes.geometry}
            material={materials.HairMaterial}
            skeleton={nodes.Eyelashes.skeleton}
          />
          <skinnedMesh
            castShadow
            receiveShadow
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials.HairMaterial}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
            castShadow
            receiveShadow
            name="Heels"
            geometry={nodes.Heels.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.Heels.skeleton}
          />
          <skinnedMesh
            castShadow
            receiveShadow
            name="Pants"
            geometry={nodes.Pants.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.Pants.skeleton}
          />
          <skinnedMesh
            castShadow
            receiveShadow
            name="Shirt"
            geometry={nodes.Shirt.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.Shirt.skeleton}
          />
          <skinnedMesh
            castShadow
            receiveShadow
            name="Suit"
            geometry={nodes.Suit.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.Suit.skeleton}
          />
          <primitive object={nodes.mixamorig8Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/conjunctivitis/touching-eyes.glb");