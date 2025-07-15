import { Environment, Sparkles } from '@react-three/drei';



const PreventionStaging = () => {
  return (
    <>
      <Environment preset="studio" background />
      {/* Efecto de partículas suaves para dar sensación de limpieza y modernidad */}
      <Sparkles count={40} scale={8} size={1.5} color="#b3e5fc" speed={0.3} />
      {/* Luz ambiental extra para suavizar sombras */}
      <ambientLight intensity={0.15} color="#e3f2fd" />
    </>
  );
};

export default PreventionStaging;
