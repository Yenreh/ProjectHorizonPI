// SymptomDisplayInfo.js
import React from 'react';
import './SymptomDisplayInfo.css';

const SymptomDisplayInfo = ({ title, explanation, instructions, isInitialPrompt }) => {
  return (
    <div className={`symptom-display-info-container ${isInitialPrompt ? 'initial-prompt' : ''}`}>
      <div className="symptom-display-info-box">
        <h2>{title}</h2>
        <p className="explanation-text">{explanation}</p>
        {instructions && (
          <div className="instructions-area">
            {isInitialPrompt ? (
              // Vista especial para el prompt inicial con la imagen de los controles
              <div className="controls-info">
                <p className="instructions-text">
                  <strong>{instructions}</strong>
                </p>
                <img 
                  src="/images/rd-sim-controls.webp" 
                  alt="Controles de la simulación: Teclas W, A, S, D para moverse y el Ratón para mirar." 
                  className="controls-image"
                />
              </div>
            ) : (
              // Vista normal para las instrucciones de otros síntomas
              <p className="instructions-text">{instructions}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomDisplayInfo;