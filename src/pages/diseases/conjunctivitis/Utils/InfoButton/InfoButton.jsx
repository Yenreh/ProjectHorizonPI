import React, { useState } from "react";
import "./InfoButton.css";

const InfoButton = ({ buttonLabel, iconClass, infoText, children }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="info-button-general"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        aria-label={buttonLabel}
      >
        <i className={iconClass}></i>
      </button>
      {showInfo && (
        <div
          className="info-box-general"
          dangerouslySetInnerHTML={{
            __html: infoText || (children && children.toString()),
          }}
        />
      )}
    </div>
  );
};

export default InfoButton;
