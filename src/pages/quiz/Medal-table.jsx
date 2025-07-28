import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import useUserStore from "../../stores/use-user-store";

function CeldaTabla3D({ texto, position, ancho = 4, largo = 1, color, colorText }) {
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

  const podio = usuarios.slice(0, 3);
  const resto = usuarios.slice(3, 13);

  // Orden correcto: 1° (oro, centro), 2° (plata, izq), 3° (bronce, der)
  const alturas = [2.8, 1.7, 1.3]; // [oro, plata, bronce]
  const colores = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const posicionesX = [0, -3.7, 3.7]; // [centro, izq, der]

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
      <Canvas
        style={{ width: "520px", height: "520px", borderRadius: "18px", background: "transparent" }}
        shadows
        camera={{ position: [-7, 7, 20], fov: 30 }} // Ajuste de cámara para reducir el zoom
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={2.3} castShadow />
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} />

        {podio.length > 0 && (
          <group position={[0, 1.5, 0]}>
            {/* Orden: centro (oro, 1°), izq (plata, 2°), der (bronce, 3°) */}
            {podio[0] && (
              <group key={0}>
                <mesh position={[posicionesX[0], alturas[0] / 2, 0]} castShadow>
                  <boxGeometry args={[2.7, alturas[0], 1.3]} />
                  <meshStandardMaterial color={colores[0]} />
                </mesh>
                <Text
                  position={[posicionesX[0], alturas[0] / 2, 0.7]}
                  fontSize={0.3}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  {podio[0].puntaje + " pts"}
                </Text>
                <Text
                  position={[posicionesX[0], alturas[0] + 0.55, 0]}
                  fontSize={0.3}
                  color="#222"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  {podio[0].nombre.split(" ").slice(0, 2).join(" ")}
                </Text>
                <Text
                  position={[posicionesX[0], -0.7, 0]}
                  fontSize={0.28}
                  color="#444"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  1°
                </Text>
              </group>
            )}
            {podio[1] && (
              <group key={1}>
                <mesh position={[posicionesX[1], alturas[1] / 2, 0]} castShadow>
                  <boxGeometry args={[2.7, alturas[1], 1.3]} />
                  <meshStandardMaterial color={colores[1]} />
                </mesh>
                <Text
                  position={[posicionesX[1], alturas[1] / 2, 0.7]}
                  fontSize={0.3}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  {podio[1].puntaje + " pts"}
                </Text>
                <Text
                  position={[posicionesX[1], alturas[1] + 0.55, 0]}
                  fontSize={0.3}
                  color="#222"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  {podio[1].nombre.split(" ").slice(0, 2).join(" ")}
                </Text>
                <Text
                  position={[posicionesX[1], -0.7, 0]}
                  fontSize={0.28}
                  color="#444"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  2°
                </Text>
              </group>
            )}
            {podio[2] && (
              <group key={2}>
                <mesh position={[posicionesX[2], alturas[2] / 2, 0]} castShadow>
                  <boxGeometry args={[2.7, alturas[2], 1.3]} />
                  <meshStandardMaterial color={colores[2]} />
                </mesh>
                <Text
                  position={[posicionesX[2], alturas[2] / 2, 0.7]}
                  fontSize={0.3}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  {podio[2].puntaje + " pts"}
                </Text>
                <Text
                  position={[posicionesX[2], alturas[2] + 0.55, 0]}
                  fontSize={0.3}
                  color="#222"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  {podio[2].nombre.split(" ").slice(0, 2).join(" ")}
                </Text>
                <Text
                  position={[posicionesX[2], -0.7, 0]}
                  fontSize={0.28}
                  color="#444"
                  anchorX="center"
                  anchorY="middle"
                  font="fonts/Montserrat-Bold.ttf"
                >
                  3°
                </Text>
              </group>
            )}
          </group>
        )}
      </Canvas>
      <div style={{ marginLeft: "38px", marginTop: "18px" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {["Posición", "Nombre", "Puntaje"].map((titulo) => (
            <div
              key={titulo}
              style={{
                background: "#020873",
                color: "white",
                borderRadius: 8,
                padding: "0.5rem 0",
                fontWeight: 700,
                fontFamily: 'Montserrat',
                fontSize: 19,
                width: 200,
                textAlign: "center",
              }}
            >
              {titulo}
            </div>
          ))}
        </div>
        {resto.map((user, filaIndex) => (
          <div key={user.nombre + filaIndex} style={{ display: "flex", gap: "0.5rem", marginBottom: 6 }}>
            <div
              style={{
                background: filaIndex % 2 === 0 ? "#D1D3FF" : "#9EA3FF",
                color: "#222",
                borderRadius: 8,
                padding: "0.5rem 0",
                fontFamily: 'Montserrat',
                fontSize: 17,
                width: 200,
                textAlign: "center",
              }}
            >
              {filaIndex + 4}
            </div>
            <div
              style={{
                background: filaIndex % 2 === 0 ? "#D1D3FF" : "#9EA3FF",
                color: "#222",
                borderRadius: 8,
                padding: "0.5rem 0",
                fontFamily: 'Montserrat',
                fontSize: 17,
                width: 200,
                textAlign: "center",
              }}
            >
              {user.nombre.split(" ").slice(0, 2).join(" ")}
            </div>
            <div
              style={{
                background: filaIndex % 2 === 0 ? "#D1D3FF" : "#9EA3FF",
                color: "#222",
                borderRadius: 8,
                padding: "0.5rem 0",
                fontFamily: 'Montserrat',
                fontSize: 17,
                width: 200,
                textAlign: "center",
              }}
            >
              {user.puntaje + " pts"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedalleroCanvas;
