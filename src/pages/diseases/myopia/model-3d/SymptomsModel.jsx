/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import useModelStore from '../../../stores/useModelStore';

function SymptomsModel(props) {
    const { nodes, materials } = useGLTF('/models-3d/myopia/model-2.glb');
    const groupRef = useRef();
    const keysPressed = useModelStore((state) => state.keysPressed);
    const activeTab = useModelStore((state) => state.activeTab);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Rotación automática leve
            groupRef.current.rotation.y += Math.sin(clock.getElapsedTime()) * 0.001;

            // Rotación y traslación manual solo si esta pestaña está activa
            if (activeTab === 'symptoms') {
                if (keysPressed['A'] || keysPressed['a']) {
                    groupRef.current.rotation.y -= 0.02;
                } else if (keysPressed['D'] || keysPressed['d']) {
                    groupRef.current.rotation.y += 0.02;
                }

                if (keysPressed['W'] || keysPressed['w']) {
                    groupRef.current.position.z = Math.max(groupRef.current.position.z - 0.1, -5);
                } else if (keysPressed['S'] || keysPressed['s']) {
                    groupRef.current.position.z = Math.min(groupRef.current.position.z + 0.1, 5);
                }
            }
        }
    });

    return (
        <group ref={groupRef} {...props} dispose={null}>
            <mesh
                geometry={nodes.SnellenTable.geometry}
                material={materials.SnellenTableMaterial}
                castShadow
                receiveShadow
            />
        </group>
    );
}

export default SymptomsModel;

useGLTF.preload('/models-3d/myopia/model-2.glb');

