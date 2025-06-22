import { Environment } from "@react-three/drei";

export default function GoldenGateHills() {
  return (
    <Environment
      files={"staging/hdris/golden_gate_hills_1k.exr"}
      background
    />
  );
}
