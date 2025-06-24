import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <Environment
      files="/textures/conjunctivitis/hospital_room.jpg"
      background
      intensity={1} 
    />
  );
};

export default Staging;
