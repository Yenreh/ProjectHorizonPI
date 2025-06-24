import { Html } from "@react-three/drei"; 

export default function SceneTitle ({ position, visible }) {
  if (!visible) return null;

  return (
    <Html
      position={position}
      center
      distanceFactor={15}
      occlude={false}
      zIndexRange={[100, 0]}
    >
      <div 
        style={{
          padding: '8px 16px',
          // backgroundColor: 'rgba(0, 0, 0, 0.5)'
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          borderRadius: '5px',
          // textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
          pointerEvents: 'none',
        }}
      >
        Haz clic en los elementos para explorarlos
      </div>
    </Html>
  );
};