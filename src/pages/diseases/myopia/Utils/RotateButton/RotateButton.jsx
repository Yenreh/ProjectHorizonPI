import React, { useState } from 'react';
import './RotateButton.css';

const RotateButton = ({ onClick, isRotating }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="rotate-button-general"
        onClick={onClick}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        aria-label={isRotating ? 'Detener giro' : 'Girar modelo'}
      >
        <i className="bi bi-arrow-repeat"></i>
      </button>
      {showInfo && (
        <div className="rotate-box-general">
          {isRotating ? 'Detener giro del modelo' : 'Girar el modelo 3D'}
        </div>
      )}
    </div>
  );
};

export default RotateButton;
