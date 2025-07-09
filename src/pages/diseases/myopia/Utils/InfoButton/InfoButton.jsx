import React, { useState } from 'react';
import './InfoButton.css';

const InfoButton = ({ buttonLabel = 'Info', iconClass = 'bi bi-info-circle-fill', children }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="info-button-general"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <i className={iconClass}></i>
        {buttonLabel}
      </button>

      {showInfo && (
        <div className='info-box-general'>
          {children}
        </div>
      )}
    </div>
  );
};

export default InfoButton;