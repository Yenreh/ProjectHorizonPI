import { Sky } from "@react-three/drei";
import { Color } from "three";

const DefinitionStaging = () => {
  return (
    <>
      <Sky
        sunPosition={[0.5, 1, -2]}
        inclination={0.55}
        azimuth={180}
        mieCoefficient={0.04}
        mieDirectionalG={0.08}
        rayleigh={3.5}
        turbidity={9}
      />
    </>
  );
};

export default DefinitionStaging;
