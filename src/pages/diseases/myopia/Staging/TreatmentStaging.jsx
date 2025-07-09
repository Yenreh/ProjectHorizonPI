import { Environment, Sky, Sparkles } from '@react-three/drei';

export default function TreatmentStaging({ mode = 1 }) {
  return (
    <>
      {mode === 1 && (
        <Environment preset="sunset" background />
      )}
      {mode === 2 && (
        <>
          <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={6} mieCoefficient={0.01} mieDirectionalG={0.8} inclination={0.6} azimuth={0.25} />
          <Sparkles count={80} scale={8} size={2} color="#fff" speed={0.5} />
        </>
      )}
    </>
  );
}
