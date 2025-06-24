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
          <p className="instructions-text">
            {/* Si es el prompt inicial, podría tener un estilo diferente o un CTA más claro */}
            {isInitialPrompt ? <strong>{instructions}</strong> : instructions}
          </p>
        )}
      </div>
    </div>
  );
};

export default SymptomDisplayInfo;