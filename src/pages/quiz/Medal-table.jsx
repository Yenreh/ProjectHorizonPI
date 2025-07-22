import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei"; // ⬅️ Importamos Text
import useUserStore from "../../stores/use-user-store";

function Podio({ nombre, puntaje, position, color = "gold" }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1, puntaje / 2 || 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, (puntaje / 2 || 1) + 0.5, 0]} // Encima del podio
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {`${nombre} (${puntaje})`}
      </Text>
    </group>
  );
}

function MedalleroCanvas() {
  const [usuarios, setUsuarios] = useState([]);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  useEffect(() => {
    (async () => {
      const data = await fetchUsers();
      setUsuarios(data.slice(0, 3)); // 🔽 Solo los 3 mejores
    })();
  }, []);

  return (
<Canvas
  style={{ width: "100%", height: "400px", borderRadius: "12px" }}
  shadows
  camera={{ position: [5, 3, 8], fov: 45 }}
>
  {/* Fondo cielo suave */}
  <color attach="background" args={["#e0f7ff"]} />

  {/* Luz ambiental */}
  <ambientLight intensity={0.5} />

  {/* Luz direccional con sombras */}
  <directionalLight
    position={[5, 10, 5]}
    intensity={1}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
  />

  {/* Piso */}
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
    <planeGeometry args={[20, 20]} />
    <shadowMaterial opacity={0.2} />
  </mesh>

  {/* Controles con ángulo limitado */}
  <OrbitControls
    enablePan={false}
    maxPolarAngle={Math.PI / 2.1}
    minPolarAngle={Math.PI / 3}
  />

  {/* Podios en vertical */}
  {usuarios.map((user, i) => (
    <Podio
      key={user.nombre}
      nombre={user.nombre}
      puntaje={user.puntaje}
      position={[0, i * 2, 0]} // Vertical
      color={i === 0 ? "gold" : i === 1 ? "silver" : "#8B4513"}
    />
  ))}
</Canvas>
  );
}

export default MedalleroCanvas;

