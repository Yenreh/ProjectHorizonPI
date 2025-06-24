// src/components/RdPrevention/RdPrevention.js
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useGLTF, // Si tus componentes de modelo no lo usan internamente
  Bounds,   // Para facilitar el enfoque
  PresentationControls // Alternativa a OrbitControls para enfoque simple
} from "@react-three/drei";
import { Col, Row } from "react-bootstrap";
import * as THREE from "three";

// ASUMO que tienes estos componentes ya definidos y que cargan tus GLB
// Si no, podemos crear unos placeholders rápidos
import Ophthalmoscope from '../models-3d/Ophthalmoscope'; // Ejemplo de ruta
import SlitLamp from '../models-3d/SlitLamp';         // Ejemplo de ruta
import SceneTitle from "../utils/SceneTitle";

// Información de los objetos
const EQUIPMENT_INFO = {
  ophthalmoscope: {
    id: "ophthalmoscope",
    name: "Oftalmoscopio",
    description: "El oftalmoscopio es un instrumento utilizado para examinar el fondo del ojo, incluyendo la retina, el disco óptico, la coroides y los vasos sanguíneos. Es crucial para diagnosticar enfermedades oculares como el glaucoma, la degeneración macular y la retinopatía diabética.",
    initialPosition: [-2.5, 0, -0.5],
    focusOffset: new THREE.Vector3(0, 0.5, 7),
    scale: [0.6,0.6,0.6]
  },
  slitlamp: {
    id: "slitlamp",
    name: "Lámpara de Hendidura",
    description: "La lámpara de hendidura es un microscopio binocular de alta potencia con una fuente de luz intensa que puede enfocarse como una rendija delgada. Permite un examen detallado de las estructuras frontales del ojo (córnea, iris, cristalino) y también del fondo de ojo con lentes especiales. Esencial para detectar cataratas, uveítis, y lesiones corneales.",
    initialPosition: [2.5, 0, 0.5],
    focusOffset: new THREE.Vector3(0, 1, 8),
    scale: [0.5,0.5,0.5]
  },
};

const OVERVIEW_CAMERA_POSITION = new THREE.Vector3(0, 2.5, 10);
const OVERVIEW_TARGET_POSITION = new THREE.Vector3(0, 0.5, 0);
const titlePosition = new THREE.Vector3(0, 2.5, 0); // Ejemplo: Centrado, un poco elevado

// Componente de la escena 3D
// Ahora pasamos una función para actualizar el objeto seleccionado en el componente padre
export default function SceneContent({ onObjectSelect, onGoBackOverview, currentSelectedKey }) {
  const { camera, scene } = useThree(); // 'scene' para raycasting si es necesario
  const controlsRef = useRef();

  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const shouldLerp = useRef(false);

  useEffect(() => {
    if (controlsRef.current) {
        controlsRef.current.enabled = !currentSelectedKey;
    }

    if (currentSelectedKey) {
      const info = EQUIPMENT_INFO[currentSelectedKey];
      const objectWorldPosition = new THREE.Vector3().fromArray(info.initialPosition);
      let objectCenterY = objectWorldPosition.y;
      // Aquí podrías ajustar 'objectCenterY' si tus modelos no tienen el pivote en la base.
      // Por ejemplo, si el objeto es SlitLamp y su altura es 2, y el pivote está en la base:
      // if (info.id === 'slitlamp') objectCenterY += 1; // O la mitad de su altura real.

      targetPosition.current.copy(objectWorldPosition).add(info.focusOffset);
      targetLookAt.current.set(objectWorldPosition.x, objectCenterY, objectWorldPosition.z);
      shouldLerp.current = true;
    } else {
      targetPosition.current.copy(OVERVIEW_CAMERA_POSITION);
      targetLookAt.current.copy(OVERVIEW_TARGET_POSITION);
      shouldLerp.current = true;
      if (controlsRef.current) {
        controlsRef.current.enableZoom = true;
        controlsRef.current.enablePan = true;
      }
    }
  }, [currentSelectedKey, camera]);

  useFrame((state, delta) => {
    if (shouldLerp.current) {
      camera.position.lerp(targetPosition.current, 0.05);
      if (controlsRef.current && controlsRef.current.target) {
        controlsRef.current.target.lerp(targetLookAt.current, 0.05);
        controlsRef.current.update();
      }
      
      if (camera.position.distanceTo(targetPosition.current) < 0.01) {
        camera.position.copy(targetPosition.current);
        if (controlsRef.current && controlsRef.current.target) {
            controlsRef.current.target.copy(targetLookAt.current);
        }
        shouldLerp.current = false;
        
        if (currentSelectedKey && controlsRef.current) {
            controlsRef.current.enableZoom = false; 
            controlsRef.current.enablePan = false;
            controlsRef.current.enabled = true;
        }
      }
    }
  });

  const handleObjectClick = (e, objectId) => {
    e.stopPropagation();
    // Asegurarse de que el objeto clickeado es el correcto
    // Esta lógica puede necesitar ajustes si los modelos son complejos
    let clickedObjectName = e.object.name;
    if (e.object.parent && e.object.parent.name === objectId && !clickedObjectName) {
        clickedObjectName = e.object.parent.name;
    }

    if (clickedObjectName === objectId) {
        onObjectSelect(objectId);
    } else {
        // Si el raycaster golpea una submalla, intenta encontrar el objeto padre nombrado.
        let parent = e.object;
        let found = false;
        while(parent) {
            if (parent.name === objectId) {
                onObjectSelect(objectId);
                found = true;
                break;
            }
            parent = parent.parent;
        }
        // Si aún no se encuentra, podría ser un problema con los nombres de los objetos.
        // console.log("Clicked on sub-mesh, but couldn't identify parent for ID:", objectId, "Clicked:", e.object);
    }
  };

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <OrbitControls 
        ref={controlsRef} 
        enableZoom={!currentSelectedKey} 
        enablePan={!currentSelectedKey}
      />

      <SceneTitle position={titlePosition} visible={!currentSelectedKey} />

      {Object.entries(EQUIPMENT_INFO).map(([key, info]) => (
        React.createElement(key === 'ophthalmoscope' ? Ophthalmoscope : SlitLamp, {
          key: info.id,
          name: info.id, // MUY IMPORTANTE: El componente del modelo debe asignar este 'name' a su mesh principal.
          position: info.initialPosition,
          scale: info.scale || [1,1,1],
          onClick: (e) => handleObjectClick(e, info.id),
          castShadow: true,
          receiveShadow: true,
        })
      ))}
      
      <mesh rotation-x={-Math.PI / 2} position-y={-1.2} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </>
  );
}
