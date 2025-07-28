
import React, { useCallback } from "react";
import "./NotLoggedModal.css";
import { useNavigate } from "react-router";

const NotLoggedModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  console.log("NotLoggedModal rendered");
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    navigate("/");
  }, [navigate, onClose]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="button-onclose" onClick={handleClose} aria-label="Cerrar">&times;</button>
        <div className="content-login-elements">
          <img src="/favicon.png" alt="Logo" className="logo-login" />
          <h2 className="title-login">¡No has iniciado sesión!</h2>
          <p className="caption-login">Debes iniciar sesión para poder realizar el quiz.</p>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedModal;
