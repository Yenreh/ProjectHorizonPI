import { Center, Text3D } from "@react-three/drei";

const PreventionText = ({ title, posX, posY, posZ }) => {

  return (
    <Center position={[posX, posY, posZ]}>
      <Text3D
        font="fonts/Montserrat-SemiBold.json"
        size={0.08}
        height={0.08}
        bevelEnabled
        bevelSize={0.00005}
        bevelThickness={0.0005}
        lineHeight={0.8}
        letterSpacing={0.01}
        rotation={[0, 0, 0]}
      >
        {title}
        <meshStandardMaterial color="rgb(16, 22, 153)" />
      </Text3D>
    </Center>
  );
};

export default PreventionText;