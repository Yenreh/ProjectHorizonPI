// SymptomMenu.js
import React from 'react';
import './SymptomMenu.css';

// import { SYMPTOM_TYPES } from './Floaters';

const SymptomMenu = ({ symptoms, activeSymptom, onSelectSymptom }) => {
  const symptomLabels = {
    [symptoms.NONE]: "Info General",
    [symptoms.FLOATERS]: "Moscas Volantes",
    [symptoms.PHOTOPSIA]: "Destellos de Luz",
    [symptoms.CURTAIN]: "Cortina Negra",
    [symptoms.BLURRED]: "Visión Borrosa",
  };

  return (
    <div className="symptom-menu">
      <h4>Síntomas:</h4>
      <ul>
        {Object.keys(symptoms).map((key) => (
          <li key={key}>
            <button
              className={activeSymptom === symptoms[key] ? 'active' : ''}
              onClick={() => onSelectSymptom(symptoms[key])}
            >
              {symptomLabels[symptoms[key]]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomMenu;