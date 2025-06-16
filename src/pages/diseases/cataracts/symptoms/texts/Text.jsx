import { Html } from "@react-three/drei";
import "./Text.css";

const Text = ({ textContent, scaleX, posX, posY, posZ}) => {
  return (
    <Html
      center
      position={[posX, posY, posZ]}
      transform
      distanceFactor={5}
      wrapperClass="title"
      scale={[scaleX, 1, 1]}
    >
      <h3> {textContent} </h3>
    </Html>
  );
};

export default Text;