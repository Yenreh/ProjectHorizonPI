import { Center, Text3D } from "@react-three/drei";

const SymptomsText = ({ title, posX, posY, posZ }) => {
  return (
    <Center position={[posX, posY, posZ]}>
      <Text3D
        font="fonts/Montserrat-SemiBold.json" 
        size={0.025}
        height={0.001} 
        bevelEnabled
        bevelSize={0.0005}
        bevelThickness={0.005}
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

export default SymptomsText;