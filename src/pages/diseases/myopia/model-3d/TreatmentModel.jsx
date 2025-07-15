/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

function TreatmentModel(props) {
    const { nodes, materials } = useGLTF('/models-3d/myopia/model-3.glb');
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState('#fff');
    const [showInfo, setShowInfo] = useState(false);
    const rotating = props.rotating;

    // Animación manual: rotación automática
    useFrame(({ clock }) => {
        if (groupRef.current) {
            if (rotating) {
                groupRef.current.rotation.y += 0.04;
            } else {
                groupRef.current.rotation.y += Math.sin(clock.getElapsedTime()) * 0.001;
            }
        }
    });

    // Eventos de mouse
    const handlePointerOver = (e) => {
        setHovered(true);
        setColor('#ffe066');
        if (e && e.target) {
            document.body.style.cursor = 'pointer';
        }
    };
    const handlePointerOut = (e) => {
        setHovered(false);
        setColor('#fff');
        document.body.style.cursor = '';
    };
    const handleClick = () => {
        setShowInfo((v) => !v);
    };
    const handleWheel = (e) => {
        if (!groupRef.current) return;
        groupRef.current.position.z += e.deltaY * 0.001;
    };

    return (
        <>
            {/* Postprocesado: Blur al fondo, se desactiva al hacer hover en las gafas */}
            <EffectComposer>
                {!hovered && (
                    <DepthOfField
                        focusDistance={0.01}
                        focalLength={0.02}
                        bokehScale={4}
                        height={480}
                    />
                )}
            </EffectComposer>
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
        </>
    );
}

export default TreatmentModel;

useGLTF.preload('/models-3d/myopia/model-3.glb');