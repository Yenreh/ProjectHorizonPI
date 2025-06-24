import { Environment } from "@react-three/drei";

export default function HospitalTwo() {
  return (
    <Environment
      files={"staging/hdris/hospital_room_2k.exr"}
      background
    />
  );
}
