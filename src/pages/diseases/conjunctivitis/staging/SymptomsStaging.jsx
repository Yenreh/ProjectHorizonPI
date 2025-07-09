import { Environment } from "@react-three/drei";
import SymptomsText from "../texts/SymptomsText.jsx";

const SymptomsStaging = () => {
  return (
    <>
      <SymptomsText title="Mantén Z para acercarte al ojo afectado" posX={0.07} posY={0.49} posZ={1} />
      <Environment
        files="/textures/conjunctivitis/hospital_room.jpg"
        background
        intensity={1}
      />
    </>
  );
};

export default SymptomsStaging;
