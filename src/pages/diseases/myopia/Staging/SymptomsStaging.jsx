import { Cloud } from "@react-three/drei";
import { Color } from "three";

const SymptomsStaging = () => {
  return (
    <>
      <Cloud
        seed={33}
        segments={24}
        bounds={[8, 3, 2]}
        concentrate="inside"
        scale={[3, 1.5, 1]}
        volume={7}
        smallestVolume={0.5}
        growth={4}
        speed={0.3}
        fade={11}
        opacity={0.7}
        color={new Color("#87CEEB")}
      />
    </>
  );
};

export default SymptomsStaging;
