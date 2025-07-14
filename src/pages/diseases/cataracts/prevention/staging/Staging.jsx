import {Environment, Sky, useTexture, Stars } from '@react-three/drei'
import { Clouds, Cloud } from '@react-three/drei'
import React, { useMemo } from 'react'

const Staging = () => {
    const PATH = useMemo(() => "/textures/cataracts/wispy-grass-meadow_", [] )
    const floorTexture = useTexture({
        map: `${PATH}albedo.png`,
        normalMap: `${PATH}normal-ogl.png`,
        aoMap: `${PATH}ao.png`,
        displacementMap: `${PATH}height.png`,

    })

    return ( 
    <>
        <Sky />
        <Clouds>
            <Cloud position={[0, 2, -2]} scale={0.5} speed={0.2} opacity={0.4} />
            <Cloud position={[3, 1.5, -4]} speed={0.5} scale={0.5} />
            <Cloud position={[-3, 2, -4]} speed={0.5} scale={0.4} opacity={0.2}/>
        </Clouds>

        <Stars
        radius={50} 
        depth={20}  
        count={2000}
        factor={2}  
        saturation={0}
        fade
        speed={1}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
            <planeGeometry args={[12, 10]} />
            <meshStandardMaterial {...floorTexture} />
            
        </mesh>
    </>
    )
}

export default Staging;