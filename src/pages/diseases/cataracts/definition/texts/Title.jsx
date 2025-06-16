import { Text } from "@react-three/drei";


const Title = () => {
  return (
    <Text
      position={[0, -1.7, 0]}
      color={"blue"}
      anchorX={"center"}
      anchorY={"middle"}
      fontSize={0.4}
      font="fonts/Montserrat-SemiBold.ttf"
    >
      Ojo afectado
    </Text>
   
  );
};

export default Title;