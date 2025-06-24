/* eslint-disable react/no-unknown-property */
import { useVideoTexture, OrbitControls } from "@react-three/drei";

const VideoSetup = ({ videoSrc }) => {
  const texture = useVideoTexture(videoSrc, {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: "anonymous",
  });

  const aspectRatio = 1920 / 1080;


  const planeWidth = 20;
  const planeHeight = planeWidth / aspectRatio; 

  return (
    <>
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <OrbitControls /> 
    </>
  );
};

export default VideoSetup;