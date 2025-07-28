import { Environment } from "@react-three/drei";

const PreventionStaging = () => {
  return (
    <>
      <Environment
        files="/staging/hdris/brown_photostudio_02_2k.exr"
        background
        intensity={1}
      />
    </>
  );
};

export default PreventionStaging;