
export default function FloorHospital() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -35, 0]} receiveShadow>
      {/* Geometría del plano para el suelo */}
      <planeGeometry args={[50, 100]} />
      {/* Material estándar para el suelo, puede recibir sombras */}
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};