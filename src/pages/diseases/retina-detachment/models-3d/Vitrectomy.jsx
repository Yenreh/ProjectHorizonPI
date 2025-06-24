import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Vitrectomy(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/retina-detachment/optimized-vitrectomy-animated.glb"
  );
  const { actions, mixer } = useAnimations(animations, group);

  const animationSequence = [
    "CannulaAction",
    "LightCylinderAction",
    "VitrectorCutterAction",
  ];
  // Usamos useRef para mantener el índice mutable sin provocar re-renders innecesarios
  const currentAnimationIndex = useRef(0);

  useEffect(() => {
    const playNextAnimation = () => {
      // Si ya se procesaron todas las animaciones, salimos
      if (currentAnimationIndex.current >= animationSequence.length) {
        console.log("Secuencia de animaciones terminada.");
        return;
      }

      const animationName = animationSequence[currentAnimationIndex.current];
      const action = actions[animationName];

      if (action) {
        // Pausar y "clamp" la animación anterior si existe
        if (currentAnimationIndex.current > 0) {
          const prevAnimationName =
            animationSequence[currentAnimationIndex.current - 1];
          const prevAction = actions[prevAnimationName];
          if (prevAction) {
            prevAction.setEffectiveWeight(1); // Aseguramos que la influencia sea total
            prevAction.clampWhenFinished = true; // Aseguramos que se quede al final
            prevAction.paused = true; // Importante: pausar la acción en su último fotograma
            prevAction.enabled = true; // Aseguramos que siga contribuyendo a la pose
            console.log(
              `Pausando y aplicando pose final de: ${prevAnimationName}`
            );
          }
        }

        // Configurar y reproducir la animación actual
        action.setLoop(THREE.LoopOnce, 0); // Reproducir una sola vez
        action.clampWhenFinished = true; // Mantener el último fotograma
        action.reset().fadeIn(0.2).play(); // Opcional: fade-in suave para transiciones
        action.setEffectiveWeight(1); // Aseguramos que la influencia sea total

        console.log(`Reproduciendo: ${animationName}`);
        currentAnimationIndex.current++; // Avanzar al siguiente índice
      } else {
        console.warn(
          `Animación no encontrada: ${animationName}. Pasando a la siguiente.`
        );
        currentAnimationIndex.current++;
        playNextAnimation(); // Intentar con la siguiente inmediatamente
      }
    };

    // Iniciar la primera animación
    playNextAnimation();

    const onFinished = (e) => {
      console.log(`Animación '${e.action.getClip().name}' ha terminado.`);
      // Si la animación que terminó es parte de nuestra secuencia
      if (animationSequence.includes(e.action.getClip().name)) {
        // No necesitamos deshabilitar la acción que acaba de terminar,
        // ya que `clampWhenFinished = true` y `paused = true` (implícito en el flujo)
        // o `enabled = true` la mantendrán activa.
        playNextAnimation();
      }
    };

    mixer.addEventListener("finished", onFinished);

    // Limpia el listener y reinicia el estado al desmontar
    return () => {
      mixer.removeEventListener("finished", onFinished);
      // Detener y deshabilitar todas las acciones al desmontar para limpiar el estado
      Object.values(actions).forEach((action) => {
        action.stop();
        action.enabled = false;
        action.clampWhenFinished = false; // Restablecer por si acaso
        action.paused = false; // Restablecer
      });
      currentAnimationIndex.current = 0;
    };
  }, [actions, mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Bones"
          castShadow
          geometry={nodes.Bones.geometry}
          material={materials.Bones10}
        />
        <mesh
          name="Choroid1"
          castShadow
          geometry={nodes.Choroid1.geometry}
          material={materials.ChoroidMaterial}
        />
        <mesh
          name="Choroid2"
          castShadow
          geometry={nodes.Choroid2.geometry}
          material={materials.ChoroidMaterial}
        />
        <mesh
          name="Cornea"
          castShadow
          geometry={nodes.Cornea.geometry}
          material={materials.CorneaMaterial}
        />
        <mesh
          name="Lens"
          castShadow
          geometry={nodes.Lens.geometry}
          material={materials.LensMaterial}
        />
        <mesh
          name="OpticRetinaPart"
          castShadow
          geometry={nodes.OpticRetinaPart.geometry}
          material={materials.OpticRetinaPartMaterial}
        />
        <mesh
          name="RetinaArteries"
          castShadow
          geometry={nodes.RetinaArteries.geometry}
          material={materials.RetinaArteriesMaterial}
        />
        <mesh
          name="RetinaVeins"
          castShadow
          geometry={nodes.RetinaVeins.geometry}
          material={materials.RetinaVeinsMaterial}
        />
        <mesh
          name="LacrimalCaniculus"
          castShadow
          geometry={nodes.LacrimalCaniculus.geometry}
          material={materials.LacrimalCaniculusMaterial}
        />
        <mesh
          name="InsideOpticNerve"
          castShadow
          geometry={nodes.InsideOpticNerve.geometry}
          material={materials.InsideOpticNerveMaterial}
        />
        <mesh
          name="OpticNerve"
          castShadow
          geometry={nodes.OpticNerve.geometry}
          material={materials.OpticNerveMaterial}
        />
        <mesh
          name="Skin"
          castShadow
          geometry={nodes.Skin.geometry}
          material={materials.SkinMaterial}
        />
        <mesh
          name="CiliaryBody"
          castShadow
          geometry={nodes.CiliaryBody.geometry}
          material={materials.CiliaryBodyMaterial}
        />
        <mesh
          name="TarsalPlateLowerEyelid"
          castShadow
          geometry={nodes.TarsalPlateLowerEyelid.geometry}
          material={materials.TarsalPlateLowerEyelidMaterial}
        />
        <mesh
          name="TarsalPlateUpperEyelid"
          castShadow
          geometry={nodes.TarsalPlateUpperEyelid.geometry}
          material={materials.TarsalPlateUpperEyelidMaterial}
        />
        <group
          name="LightCylinder"
          position={[0.078, -0.364, 2.88]}
          rotation={[-0.151, 0.055, 0.088]}
        >
          <mesh
            name="LightCylinder_1"
            castShadow
            geometry={nodes.LightCylinder_1.geometry}
            material={materials.SurgicalElementsMaterial}
          />
          <mesh
            name="LightCylinder_2"
            castShadow
            geometry={nodes.LightCylinder_2.geometry}
            material={materials.LightMaterial}
          />
        </group>
        <mesh
          name="VitrectorCutter"
          castShadow
          geometry={nodes.VitrectorCutter.geometry}
          material={materials.SurgicalElementsMaterial}
          position={[1.038, 3.357, 14.767]}
        />
        <mesh
          name="Cannula"
          castShadow
          geometry={nodes.Cannula.geometry}
          material={materials.SurgicalElementsMaterial}
          position={[0, 0.26, 3.129]}
        />
        <mesh
          name="CutRing1"
          castShadow
          geometry={nodes.CutRing1.geometry}
          material={materials.SurgicalElementsMaterial}
        />
        <mesh
          name="CutRing2"
          castShadow
          geometry={nodes.CutRing2.geometry}
          material={materials.SurgicalElementsMaterial}
        />
        <mesh
          name="CutRing3"
          castShadow
          geometry={nodes.CutRing3.geometry}
          material={materials.SurgicalElementsMaterial}
        />
      </group>

    </group>
  );
}

useGLTF.preload(
  "/models-3d/retina-detachment/optimized-vitrectomy-animated.glb"
);
