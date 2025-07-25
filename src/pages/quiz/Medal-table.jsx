import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import useUserStore from "../../stores/use-user-store";

function CeldaTabla3D({ texto, position, ancho=4, largo = 1, color, colorText }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[ancho, largo, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.3}
        color={colorText}
        anchorX="center"
        anchorY="middle"
        font="fonts/Montserrat-Bold.ttf"
      >
        {texto}
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
      setUsuarios(data.sort((a, b) => b.puntaje - a.puntaje));
    })();
  }, []);

  return (
<Canvas
  style={{ width: "900px", height: "400px", borderRadius: "12px" }}
  shadows
  camera={{ position: [0, 0, 10], fov: 45 }}
>
  {/* <color attach="background" args={["#e0f7ff"]} /> */}
  <ambientLight intensity={0.5} />
  <directionalLight position={[5, 10, 5]} intensity={2} castShadow />

  <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} />

  {/* Encabezados */}
  {["Posición", "Nombre", "Puntaje"].map((titulo, colIndex) => (
    <CeldaTabla3D
      key={`header-${colIndex}`}
      texto={titulo}
      position={[colIndex * 4.2 - 4, 0 + 3, 0]}
      color="#020873"
      colorText="white"
    />
  ))}

  {/* Filas de datos */}
  {usuarios.map((user, filaIndex) => {
    const row = [
      `#${filaIndex + 1}`,
      user.nombre.split(" ").slice(0, 2).join(" "),
      user.puntaje.toString()
    ];

    return row.map((texto, colIndex) => (
      <CeldaTabla3D
        key={`celda-${filaIndex}-${colIndex}`}
        texto={texto}
        position={[colIndex * 4.2 - 4, -(filaIndex + 1) * 1.2 + 3, 0]}
        color={filaIndex % 2 === 0 ? "#D1D3FF" : "#9EA3FF"}
        colorText="black"
      />
    ));
  })}
</Canvas>

  );
}

export default MedalleroCanvas;