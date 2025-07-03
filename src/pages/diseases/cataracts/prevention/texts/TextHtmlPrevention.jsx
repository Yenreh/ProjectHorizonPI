import { Html } from '@react-three/drei';
import './TitlePrevention.css'

const TextHtmlPrevention = () => {

  return (
    <Html
      center
      // position={[-1.2, 1.6, 0.5]}
      transform={false}
      // distanceFactor={5}
      wrapperClass="classTitlePrevention"
      // scale={[1, 1, 1]}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <h1
          className="info-button-prevention"
        >
          <i class="bi bi-volume-up-fill"></i>
           Presiona e para escuchar
        </h1>
      </div>
    </Html>
  );
};

export default TextHtmlPrevention;