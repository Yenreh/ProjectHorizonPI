import { Html } from "@react-three/drei";
import "./Text.css";

const Text = ({ textContent }) => {
  return (
    <Html
      center
      // position={[posX, posY, posZ]}
      transform={false}
      // distanceFactor={5}
      wrapperClass="textSymotoms"
      // scale={[scaleX, 1, 1]}
    >
      <h3> {textContent} </h3>
    </Html>
  );
};

export default Text;