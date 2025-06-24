import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

export default function InteractiveTag({ position, text }) {
  const meshRef = useRef();
  const [showText, setShowText] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Animate the tag to make it more noticeable
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1); // Scale up on hover
    }
  });

  const handleClick = () => {
    setShowText(!showText);
  };

  return (
    <group position={position}>
      {/* The clickable sphere */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} /> {/* Small sphere for the tag */}
        <meshStandardMaterial
          color={hovered ? '#ff6347' : '#00bfff'} // Change color on hover
          emissive={hovered ? '#ff6347' : '#00bfff'}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* The HTML text that appears on click */}
      {showText && (
        <Html
          position={[0, 2, 0]} // Position text slightly above the sphere in 3D space
          center // Center the HTML element relative to its 3D position
          distanceFactor={12} // Adjust how much the HTML scales with distance
          zIndexRange={[100, 0]} // Ensure HTML is always on top
        >
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
              padding: '15px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '50px', // Large font size
              fontFamily: 'sans-serif', // Use a default system font
              width: '600px', // Limit text width
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              userSelect: 'none', // Prevent text selection
              cursor: 'pointer', // Indicate it's clickable
            }}
            onClick={handleClick} // Allow clicking the text to hide it
          >
            {text}
          </div>
        </Html>
      )}
    </group>
  );
}
