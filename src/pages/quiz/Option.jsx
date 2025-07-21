import React, { useRef, useState, useCallback, useEffect } from "react";
import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three"; // Importar THREE para Vector3

/**
 * Componente 3D para una opción de respuesta en el quiz.
 * Representa una caja física con texto que puede ser golpeada por un proyectil.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.label - Texto de la opción.
 * @param {Array<number>} props.position - Posición [x, y, z] de la opción en la escena 3D.
 * @param {boolean} props.isCorrect - Indica si esta opción es la respuesta correcta.
 * @param {boolean} props.showResult - Indica si se debe mostrar el resultado (correcta/incorrecta).
 * @param {function} props.onHit - Función de callback cuando la opción es golpeada por un proyectil.
 * @param {number} props.preguntaIndex - Índice de la pregunta actual para una clave única.
 */
export function Option({ label, position, isCorrect, showResult, onHit, preguntaIndex, respondida }) {
  const ref = useRef();
  const [isHit, setIsHit] = useState(false);

  const color = showResult ? (isCorrect ? "#10b981" : "#ef4444") : "#f3f4f6";
  const textColor = showResult ? "white" : "black";

  // Nueva prop respondida
  const handleCollision = useCallback(({ other }) => {
    if (!isHit && other.rigidBody?.userData?.isProjectile && !respondida) {
      setIsHit(true);
      onHit(label);
      if (ref.current) {
        ref.current.applyImpulse(new THREE.Vector3(0, 2, -1), true);
      }
    }
  }, [isHit, onHit, label, respondida]);

  // Reset cuando cambia la pregunta
  useEffect(() => {
    setIsHit(false);
  }, [preguntaIndex]);

  return (
    <RigidBody
      ref={ref}
      key={`opcion-${preguntaIndex}-${label}`}
      type="dynamic"
      mass={1}
      colliders="cuboid"
      position={position}
      userData={{ label, isCorrect }}
      onCollisionEnter={handleCollision}
      restitution={0.2}
      friction={0.7}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.5, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.7} />
      </mesh>
      <Text
        position={[0, 0, 0.5]}
        fontSize={0.22}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {label}
      </Text>
    </RigidBody>
  );
}