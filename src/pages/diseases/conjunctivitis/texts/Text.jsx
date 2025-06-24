import { Html } from "@react-three/drei";
import "./Text.css";

const Text = ({ textContent }) => {
  // Soporta saltos de línea con \n o \n\n
  const lines = String(textContent).split(/\n+/);
  return (
    <Html
      center
      position={[0.64, 0.9, 0]}
      transform
      distanceFactor={0.68}
      wrapperClass="title"
    >
      {lines.map((line, idx) => (
        <h2 key={idx} style={{ margin: 0, padding: 0 }}>
          {line}
        </h2>
      ))}
    </Html>
  );
};

export default Text;
