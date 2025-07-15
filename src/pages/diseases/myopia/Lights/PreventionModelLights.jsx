/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export default function PreventionModelLights() {
    const directionalLightRef = useRef();

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        if (directionalLightRef.current) {
            directionalLightRef.current.position.x = MathUtils.lerp(
                -1,
                1,
                (Math.cos(elapsedTime) * 0.5 + 0.5)
            );
        }
    });

    return (
        <>
            <ambientLight intensity={1.2} />
            <directionalLight
                ref={directionalLightRef}
                color={"white"}
                position={[0, 5, 5]}
                intensity={3}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0005}
            />
        </>
    );
}
