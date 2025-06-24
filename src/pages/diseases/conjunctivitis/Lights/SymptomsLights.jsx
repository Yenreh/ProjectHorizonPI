export default function SymptomsLights() {
  // Luz tipo spot apuntando hacia abajo desde arriba
  return (
    <>
      <ambientLight intensity={3} />
      <spotLight
        position={[0, 10, 0]}
        angle={Math.PI / 4}
        penumbra={0.3}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={0.01}
        target-position={[0, 0, 0]}
      />
    </>
  );
}
