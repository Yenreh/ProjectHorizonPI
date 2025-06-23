import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <Environment
      files="/textures/conjunctivitis/pure_sky.jpg"
      background
      intensity={1} 
    />
  );
};

export default Staging;
