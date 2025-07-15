import { Sky } from "@react-three/drei";

const PreventionStaging = () => {
  return (
    <Sky
      sunPosition={[1, 2, 2]}
      inclination={0.45}
      azimuth={120}
      mieCoefficient={0.03}
      mieDirectionalG={0.1}
      rayleigh={2.5}
      turbidity={7}
    />
  );
};

export default PreventionStaging;
