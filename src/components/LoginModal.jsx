import React from 'react';
import "./login.css";
import useAuthStore from "../stores/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export default function LoginModal({ visible, onClose }) {
  if (!visible) return null;

  const { loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => {
        onClose();
      })
        
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="button-onclose" onClick={onClose}>×</button>
        <div className="content-login-elements">
          <img src="/favicon.png" alt="Logo" className="logo-login" />
          <h2 className="title-login">HORIZON</h2>
          <p className="caption-login">Inicia sesión y accede a información sobre la salud visual</p>
          <button 
            className="button-google"
            type="button"
            title="Iniciar sesíón con Google"
            onClick={handleLogin}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="icon-google" />
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}