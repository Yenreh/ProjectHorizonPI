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

  const alturas = [1.7, 2.8, 1.3];
  const colores = ["#C0C0C0", "#FFD700", "#CD7F32"];
  const posicionesX = [-3.7, 0, 3.7];

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
          <group position={[0, 1.5, 0]}> {/* Elevación leve del podio */}
            {[1, 0, 2].map((idx, i) =>
              podio[idx] && (
                <group key={idx}>
                  <mesh position={[posicionesX[i], alturas[idx] / 2, 0]} castShadow>
                    <boxGeometry args={[2.7, alturas[idx], 1.3]} />
                    <meshStandardMaterial color={colores[idx]} />
                  </mesh>

                  {/* Puntaje sobre la cara frontal del podio */}
                  <Text
                    position={[posicionesX[i], alturas[idx] / 2, 0.7]}
                    fontSize={0.3}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    font="fonts/Montserrat-Bold.ttf"
                  >
                    {podio[idx].puntaje + " pts"}
                  </Text>

                  {/* Nombre y posición por encima */}
                  <Text
                    position={[posicionesX[i], alturas[idx] + 0.55, 0]}
                    fontSize={0.3}
                    color="#222"
                    anchorX="center"
                    anchorY="middle"
                    font="fonts/Montserrat-Bold.ttf"
                  >
                    {podio[idx].nombre.split(" ").slice(0, 2).join(" ")}
                  </Text>
                  <Text
                    position={[posicionesX[i], -0.7, 0]}
                    fontSize={0.28}
                    color="#444"
                    anchorX="center"
                    anchorY="middle"
                    font="fonts/Montserrat-Bold.ttf"
                  >
                    {idx + 1}°
                  </Text>
                </group>
              )
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
