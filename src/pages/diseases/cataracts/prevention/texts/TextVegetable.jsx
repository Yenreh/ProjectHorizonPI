import { Text } from "@react-three/drei";


const TextVegetable = () => {
  return (
    <Text
      position={[0, 1.1, 0]}
      color={"blue"}
      anchorX={"center"}
      anchorY={"middle"}
      fontSize={0.12}
      font="fonts/Montserrat-SemiBold.ttf"
    >
      Consume verduras y cuida tu salud ocular
    </Text>
   
  );
};

export default TextVegetable;