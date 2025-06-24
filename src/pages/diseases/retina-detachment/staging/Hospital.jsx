import { Environment } from "@react-three/drei";

export default function Hospital() {
  return (
    <Environment
      files={"staging/hdris/surgery_2k.exr"}
      background
    />
  );
}
