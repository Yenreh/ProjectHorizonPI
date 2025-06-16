import { Environment } from '@react-three/drei'
import Title from '../texts/Title'
import TextHtml from '../texts/TextHtml';

const NotCloudy = () => {
    return ( 
    <>
        <TextHtml scaleX={-1} posX={0.8} posY={1.4} posZ={0.7} />
        <Title title={"Con tratamiento"} posY={1} posZ={1.8} />
        <Environment preset='park' background/>
    </>
    )
}

export default NotCloudy;