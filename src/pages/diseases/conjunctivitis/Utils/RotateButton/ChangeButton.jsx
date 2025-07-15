import React, { useState } from "react";
import "./ChangeButton.css";

const ChangeButton = ({ activeScene, onSceneChange, buttonText }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    const newScene = activeScene === 1 ? 2 : 1;
    onSceneChange(newScene);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="change-button-general"
        onClick={handleClick}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        aria-label="Cambiar escena"
      >
        <i className="bi bi-pencil"></i>
      </button>
      {showInfo && <div className="change-box-general">{buttonText}</div>}
    </div>
  );
};

export default ChangeButton;
