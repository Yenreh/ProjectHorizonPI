/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'

export default function DefinitionModelLights() {
    const directionalLightRef = useRef();

    return (
        <>
            <ambientLight intensity={1.2} />
            <directionalLight
                ref={directionalLightRef}
                position={[2, 6, 2]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0005}
            />
        </>
    );
}