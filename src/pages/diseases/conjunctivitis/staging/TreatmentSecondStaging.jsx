import { Environment } from "@react-three/drei";

const TreatmentSecondStaging = () => {
  console.log("TreatmentSecondStaging renderizado");

  return (
    <>
      <Environment
        files="/textures/conjunctivitis/bathroom.jpg"
        background
        intensity={1}
      />
    </>
  );
};

export default TreatmentSecondStaging;
