import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import './Title.css'

const TextHtml = ({ scaleX, posX, posY, posZ }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Html
      center
      position={[posX, posY, posZ]}
      transform
      distanceFactor={5}
      wrapperClass="title"
      scale={[scaleX, 1, 1]}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          className="info-button-cataracts"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <i className="bi bi-info-circle-fill"></i>
          Info
        </button>

        {showInfo && (
          <div className='info-box-cataracts'
          >
            👁️ Presiona: <br />
            a - Vista sin tratamiento  <br />
            t - Efecto del tratamiento <br />
            v / clic - Volver
          </div>
        )}
      </div>
    </Html>
  );
};

export default TextHtml;