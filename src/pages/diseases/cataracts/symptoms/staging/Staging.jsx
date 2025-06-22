import {Environment, Sky } from '@react-three/drei'

const Staging = () => {
    return ( 
    <>
        <Environment preset='park' background/>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial transparent opacity={0.3} />
            
        </mesh>
    </>
    
    
    )

}

export default Staging;