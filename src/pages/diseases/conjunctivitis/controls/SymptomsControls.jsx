import { OrbitControls } from "@react-three/drei";

export default function SymptomsControls({ enabled = true }) {
  return (
    <OrbitControls
      enabled={enabled}
      target={[0.1, 0, 0]}
      enableZoom={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={-Math.PI / 8}
      maxAzimuthAngle={Math.PI / 8}
    />
  );
}
