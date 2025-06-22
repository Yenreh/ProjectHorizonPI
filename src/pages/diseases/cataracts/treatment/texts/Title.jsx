import { Center, Html, Text, Text3D } from "@react-three/drei";


const Title = ({ title, posY, posZ }) => {
  return (
    <Center position={[0, posY, posZ]}>
      <Text3D
        font="fonts/Montserrat-SemiBold.json"
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.02}
        height={0.01}
        lineHeight={0.8}
        letterSpacing={0.02}
        size={0.2}
        scale={[-1, 1, 1]}
      >
        {`${title}`}
        <meshStandardMaterial color="blue" />
      </Text3D>
    </Center>
  );
};

export default Title;