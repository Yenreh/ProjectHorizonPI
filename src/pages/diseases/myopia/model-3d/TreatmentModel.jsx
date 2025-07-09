/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';

export function Model(props) {
    const { nodes, materials } = useGLTF('/models-3d/myopia/model-3.glb');
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState('#fff');
    const [showInfo, setShowInfo] = useState(false);
    const rotating = props.rotating;

    // Animación manual: rotación automática y por teclado
    useFrame(({ clock }) => {
        if (groupRef.current) {
            if (rotating) {
                groupRef.current.rotation.y += 0.04;
            } else {
                groupRef.current.rotation.y += Math.sin(clock.getElapsedTime()) * 0.001;
            }
        }
    });

    // Eventos de teclado (A/D para rotar, W/S para acercar/alejar)
    const handleKeyDown = (e) => {
        if (!groupRef.current) return;
        if (e.key === 'a' || e.key === 'A') {
            groupRef.current.rotation.y -= 0.1;
        } else if (e.key === 'd' || e.key === 'D') {
            groupRef.current.rotation.y += 0.1;
        } else if (e.key === 'w' || e.key === 'W') {
            groupRef.current.position.z = Math.max(groupRef.current.position.z - 0.1, -2);
        } else if (e.key === 's' || e.key === 'S') {
            groupRef.current.position.z = Math.min(groupRef.current.position.z + 0.1, 2);
        }
    };

    // Eventos de mouse
    const handlePointerOver = () => {
        setHovered(true);
        setColor('#ffe066');
    };
    const handlePointerOut = () => {
        setHovered(false);
        setColor('#fff');
    };
    const handleClick = () => {
        setShowInfo((v) => !v);
    };
    const handleWheel = (e) => {
        if (!groupRef.current) return;
        groupRef.current.position.z += e.deltaY * 0.001;
    };

    return (
        <KeyboardControls
            map={[
                { name: 'left', keys: ['a', 'A'] },
                { name: 'right', keys: ['d', 'D'] },
                { name: 'forward', keys: ['w', 'W'] },
                { name: 'backward', keys: ['s', 'S'] },
            ]}
            onKeyDown={handleKeyDown}
        >
            <group
                {...props}
                ref={groupRef}
                dispose={null}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
                onWheel={handleWheel}
            >
                {/* Modelo 3D con materiales PBR */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.GooglesLents.geometry}
                    material={materials.GooglesLentsMaterial}
                    material-color={color}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.GooglesFrame.geometry}
                    material={materials.GooglesFrameMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.GooglesFrameSupportEnd.geometry}
                    material={materials.GooglesFrameSupportEndMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.GooglesFrameSupportMid.geometry}
                    material={materials.GooglesFrameSupportMidMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.GooglesFrameJoins.geometry}
                    material={materials.GooglesFrameJoinsMaterial}
                />
                
            </group>
        </KeyboardControls>
    );
}

useGLTF.preload('/model-3.glb');