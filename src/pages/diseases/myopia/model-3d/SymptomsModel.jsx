/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import useModelStore from '../../../stores/useModelStore';

export function SymptomsModel(props) {
    const { nodes, materials } = useGLTF('/models-3d/myopia/model-2.glb');
    const groupRef = useRef();
    const keysPressed = useModelStore((state) => state.keysPressed);

    useFrame(({ clock }) => {
        // Rotación automática leve
        groupRef.current.rotation.y += Math.sin(clock.getElapsedTime()) * 0.001;

        // Rotación manual
        if (keysPressed['A']) {
            groupRef.current.rotation.y -= 0.02;
        } else if (keysPressed['D']) {
            groupRef.current.rotation.y += 0.02;
        }

        // Traslación manual en el eje Z
        if (keysPressed['W']) {
            groupRef.current.position.z = Math.max(groupRef.current.position.z - 0.1, -5);
        } else if (keysPressed['S']) {
            groupRef.current.position.z = Math.min(groupRef.current.position.z + 0.1, 5);
        }
    });

    return (
        <group ref={groupRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.SnellenTable.geometry}
                material={materials.SnellenTableMaterial}
                castShadow
            />
        </group>
    );
}

export default SymptomsModel;

useGLTF.preload('/model-2.glb');

