import React, { useRef, useState, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

/**
 * Componente para la mecánica de "arrastrar" una bola.
 * El usuario puede arrastrar la bola con el ratón para moverla.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.respondida - Indica si la pregunta ya fue respondida.
 * @param {string} props.color - Color de la bola.
 * @param {number} props.preguntaIndex - Índice de la pregunta actual para una clave única.
 */
export function BolaArrastrable({ respondida, color, preguntaIndex, resetBolaFlag }) {
  const ref = useRef(); // Referencia al RigidBody de la bola
  const initialPosition = useRef(new THREE.Vector3(0, 2, 6));
  const [currentPosition, setCurrentPosition] = useState(initialPosition.current.clone());
  const { camera, gl, raycaster, pointer } = useThree(); // Hooks de Three.js para interacción
  const [isDragging, setIsDragging] = useState(false); // Estado de arrastre
  const [dragOffset, setDragOffset] = useState(new THREE.Vector3()); // Desplazamiento del punto de agarre
  const intersectionPoint = useRef(new THREE.Vector3()); // Punto de intersección del rayo
  // Plano de "suelo" para el arrastre, a una altura de Y=0 (para que la bola no se hunda)
  const groundPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  // Manejador de evento al presionar el ratón sobre la bola
  const handlePointerDown = useCallback((event) => {
    if (respondida) return;
    event.stopPropagation();
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(event.object);
    if (intersects.length > 0) {
      const worldPos = ref.current?.translation();
      if (worldPos) {
        setDragOffset(intersects[0].point.clone().sub(new THREE.Vector3(worldPos.x, worldPos.y, worldPos.z)));
      }
    }
    setIsDragging(true);
    gl.domElement.style.cursor = 'grabbing';
  }, [respondida, gl, camera, raycaster, pointer]);

  // Manejador de evento al soltar el ratón
  const handlePointerUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false); // Desactivar el modo de arrastre
      gl.domElement.style.cursor = 'auto'; // Restaurar cursor
    }
  }, [isDragging, gl]);

  // Hook useFrame se ejecuta en cada fotograma de la animación
  useFrame(() => {
    if (isDragging && ref.current) {
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(groundPlane.current, intersectionPoint.current)) {
        const newPos = intersectionPoint.current.clone().sub(dragOffset);
        newPos.y = Math.max(1, newPos.y);
        newPos.x = Math.max(-10, Math.min(10, newPos.x));
        newPos.z = Math.max(-6, Math.min(8, newPos.z));
        ref.current.setTranslation(newPos, true);
        ref.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
        ref.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
        setCurrentPosition(newPos.clone());
      }
    }
  });
  // Resetear la posición cuando cambia la pregunta o se pulsa el botón de reset
  useEffect(() => {
    setCurrentPosition(initialPosition.current.clone());
    if (ref.current) {
      ref.current.setTranslation(initialPosition.current, true);
      ref.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
      ref.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
    }
  }, [preguntaIndex, resetBolaFlag]);

  // Efecto para añadir y limpiar listeners de eventos globales del canvas
  useEffect(() => {
    const handleGlobalPointerUp = () => handlePointerUp();
    const canvas = gl.domElement;
    canvas.addEventListener('pointerup', handleGlobalPointerUp);
    canvas.addEventListener('pointerleave', handleGlobalPointerUp); // Si el puntero sale del canvas

    return () => {
      canvas.removeEventListener('pointerup', handleGlobalPointerUp);
      canvas.removeEventListener('pointerleave', handleGlobalPointerUp);
    };
  }, [gl, handlePointerUp]);

  return (
    <RigidBody
      ref={ref}
      key={`bola-arrastrable-${preguntaIndex}`}
      colliders="ball"
      position={currentPosition}
      restitution={0.4}
      friction={0.8}
      mass={1}
      userData={{ isProjectile: true }}
    >
      <mesh
        onPointerDown={handlePointerDown}
        onPointerOver={() => !isDragging && !respondida && (gl.domElement.style.cursor = 'grab')}
        onPointerOut={() => !isDragging && (gl.domElement.style.cursor = 'auto')}
        castShadow
      >
        <sphereGeometry args={[0.6]} />
        <meshStandardMaterial
          color={isDragging ? "#fbbf24" : color}
          emissive={isDragging ? "#f59e0b" : "#000000"}
          emissiveIntensity={isDragging ? 0.3 : 0}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
    </RigidBody>
  );
}

/**
 * Componente para la mecánica de "impulso" de una bola.
 * Al hacer clic en el canvas, se aplica un impulso a la bola.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.respondida - Indica si la pregunta ya fue respondida.
 * @param {string} props.color - Color de la bola.
 * @param {number} props.preguntaIndex - Índice de la pregunta actual para una clave única.
 */
export function BolaImpulso({ respondida, color, preguntaIndex, resetBolaFlag }) {
  const ref = useRef();
  const initialPosition = useRef(new THREE.Vector3(0, 2, 6));
  const { gl } = useThree();
  const [energia, setEnergia] = useState(1);
  // Resetear posición y velocidades al cambiar preguntaIndex o resetBolaFlag
  useEffect(() => {
    if (ref.current) {
      ref.current.setTranslation(initialPosition.current, true);
      ref.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
      ref.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
    }
    setEnergia(1);
  }, [preguntaIndex, resetBolaFlag]);

  const handleClick = useCallback((e) => {
    if (respondida || !ref.current) return;
    e.stopPropagation();
    const fuerza = 8 + Math.random() * 4;
    const direccionX = (Math.random() - 0.5) * 3;
    const direccionZ = -fuerza;
    ref.current.applyImpulse(new THREE.Vector3(direccionX, 2, direccionZ), true);
    ref.current.applyTorqueImpulse(new THREE.Vector3(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ), true);
    setEnergia(e => Math.max(0.1, e * 0.8));
  }, [respondida]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', handleClick);
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [gl, handleClick]);

  return (
    <RigidBody
      ref={ref}
      key={`bola-impulso-${preguntaIndex}`}
      colliders="ball"
      position={initialPosition.current}
      restitution={0.6}
      friction={0.3}
      mass={2}
      userData={{ isProjectile: true }}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={energia * 0.3}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
    </RigidBody>
  );
}

/**
 * Componente para la mecánica de "catapulta" de una bola.
 * El usuario mantiene presionado para cargar poder y apunta, luego suelta para lanzar.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.respondida - Indica si la pregunta ya fue respondida.
 * @param {string} props.color - Color de la bola.
 * @param {number} props.preguntaIndex - Índice de la pregunta actual para una clave única.
 */
export function BolaCatapulta({ respondida, color, preguntaIndex, resetBolaFlag }) {
  const bolaRef = useRef();
  const initialPosition = useRef(new THREE.Vector3(0, 2, 6));
  const { gl, camera, raycaster, pointer } = useThree();
  const [isCharging, setIsCharging] = useState(false);
  const [power, setPower] = useState(0);
  const [aimDirection, setAimDirection] = useState(new THREE.Vector3());
  // Resetear posición y todos los estados internos al cambiar preguntaIndex o resetBolaFlag
  useEffect(() => {
    if (bolaRef.current) {
      bolaRef.current.setTranslation(initialPosition.current, true);
      bolaRef.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
      bolaRef.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
    }
    setIsCharging(false);
    setPower(0);
    setAimDirection(new THREE.Vector3());
    // Si hay otros estados internos, reiniciarlos aquí
  }, [preguntaIndex, resetBolaFlag]);

  const handlePointerDown = useCallback((e) => {
    if (respondida) return;
    e.stopPropagation();
    setIsCharging(true);
    gl.domElement.style.cursor = 'crosshair';
  }, [respondida, gl]);

  const handlePointerUp = useCallback(() => {
    if (!isCharging || respondida || !bolaRef.current) return;
    const finalPower = Math.min(power, 12);
    bolaRef.current.applyImpulse(new THREE.Vector3(
      aimDirection.x * finalPower * 0.8,
      Math.max(3, finalPower * 0.6),
      aimDirection.z * finalPower
    ), true);
    bolaRef.current.applyTorqueImpulse(new THREE.Vector3(
      Math.random() * 8 - 4,
      Math.random() * 8 - 4,
      Math.random() * 8 - 4
    ), true);
    setIsCharging(false);
    setPower(0);
    gl.domElement.style.cursor = 'auto';
  }, [isCharging, respondida, power, aimDirection, gl]);

  useFrame(() => {
    if (isCharging) {
      raycaster.setFromCamera(pointer, camera);
      const direction = raycaster.ray.direction.clone();
      direction.y = 0;
      direction.normalize();
      setAimDirection(direction);
      setPower(p => Math.min(p + 0.1, 12));
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl, handlePointerDown, handlePointerUp]);

  return (
    <>
      <RigidBody
        ref={bolaRef}
        key={`bola-catapulta-${preguntaIndex}-${resetBolaFlag}`}
        colliders="ball"
        position={initialPosition.current}
        restitution={0.5}
        friction={0.4}
        mass={1.5}
        userData={{ isProjectile: true }}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.6]} />
          <meshStandardMaterial
            color={isCharging ? "#fbbf24" : color}
            emissive={isCharging ? "#f59e0b" : color}
            emissiveIntensity={isCharging ? power * 0.05 : 0.1}
            metalness={0.2}
            roughness={0.1}
          />
        </mesh>
      </RigidBody>
      {isCharging && (
        <group position={new THREE.Vector3(0, 4, 6)}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, power * 0.5, 8]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh
            position={new THREE.Vector3(aimDirection.x * 2, 0, aimDirection.z * 2)}
            lookAt={new THREE.Vector3(aimDirection.x * 4, 0, aimDirection.z * 4)}
          >
            <coneGeometry args={[0.2, 0.8, 8]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}
    </>
  );
}

/**
 * Componente para la mecánica de "bowling".
 * El usuario hace clic una vez para apuntar y otra vez para lanzar la bola.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.respondida - Indica si la pregunta ya fue respondida.
 * @param {string} props.color - Color de la bola.
 * @param {number} props.preguntaIndex - Índice de la pregunta actual para una clave única.
 */
export function SistemaBowling({ respondida, color, preguntaIndex, resetBolaFlag }) {
  const bolaRef = useRef();
  const initialPosition = useRef(new THREE.Vector3(0, 1, 6));
  const { gl, camera, raycaster, pointer } = useThree();
  const [isAiming, setIsAiming] = useState(false);
  const [velocity, setVelocity] = useState(new THREE.Vector3());
  // Resetear posición y todos los estados internos al cambiar preguntaIndex o resetBolaFlag
  useEffect(() => {
    if (bolaRef.current) {
      bolaRef.current.setTranslation(initialPosition.current, true);
      bolaRef.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
      bolaRef.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
    }
    setIsAiming(false);
    setVelocity(new THREE.Vector3());
    // Si hay otros estados internos, reiniciarlos aquí
  }, [preguntaIndex, resetBolaFlag]);

  const handlePointerMove = useCallback((e) => {
    if (respondida || !isAiming) return;
    raycaster.setFromCamera(pointer, camera);
    const direction = raycaster.ray.direction.clone();
    direction.y = 0;
    direction.normalize();
    direction.multiplyScalar(8);
    setVelocity(direction);
  }, [respondida, isAiming, camera, raycaster, pointer]);

  const handleClick = useCallback((e) => {
    if (respondida || !bolaRef.current) return;
    e.stopPropagation();
    if (!isAiming) {
      setIsAiming(true);
      gl.domElement.style.cursor = 'crosshair';
    } else {
      bolaRef.current.setLinvel(velocity, true);
      bolaRef.current.applyTorqueImpulse(new THREE.Vector3(
        0,
        velocity.z * 0.5,
        -velocity.x * 0.5
      ), true);
      setIsAiming(false);
      gl.domElement.style.cursor = 'auto';
    }
  }, [respondida, isAiming, velocity, gl]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('pointermove', handlePointerMove);
    return () => {
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('pointermove', handlePointerMove);
    };
  }, [gl, handleClick, handlePointerMove]);

  return (
    <>
      <RigidBody
        ref={bolaRef}
        key={`bola-bowling-${preguntaIndex}-${resetBolaFlag}`}
        colliders="ball"
        position={initialPosition.current}
        restitution={0.1}
        friction={0.8}
        mass={5}
        userData={{ isProjectile: true }}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.8]} />
          <meshStandardMaterial
            color={isAiming ? "#fbbf24" : color}
            emissive={isAiming ? "#f59e0b" : color}
            emissiveIntensity={isAiming ? 0.2 : 0.05}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>
      </RigidBody>
      {isAiming && (
        <mesh
          position={new THREE.Vector3(velocity.x * 0.5, 1, 6 + velocity.z * 0.5)}
          lookAt={new THREE.Vector3(velocity.x * 2, 1, 6 + velocity.z * 2)}
        >
          <cylinderGeometry args={[0.05, 0.15, 2, 8]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
        </mesh>
      )}
    </>
  );
}
