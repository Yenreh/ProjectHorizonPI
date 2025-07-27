import React, { useState } from 'react';
import './ZoomButton.css';

const ZoomButton = ({ buttonLabel = 'Zoom', iconClass = 'bi bi-Zoom-circle-fill', children, onClick }) => {
  const [showZoom, setShowZoom] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="zoom-button-general"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onClick={onClick}
      >
        <i className={iconClass}></i>
        {buttonLabel}
      </button>

      {showZoom && (
        <div className='zoom-box-general'>
          {children}
        </div>
      )}
    </div>
  );
};

export default ZoomButton;