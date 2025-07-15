import { Environment } from "@react-three/drei";

const TreatmentStaging = () => {
  return (
    <>
      <Environment
        files="/textures/conjunctivitis/hospital_room2.jpg"
        background
        intensity={1}
      />
    </>
  );
};

export default TreatmentStaging;