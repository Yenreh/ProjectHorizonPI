import React from "react";
import './Quiz.css'; // Importar el archivo CSS
import MedalleroCanvas from "./Medal-table";
import { Trophy, ThumbsUp, BookOpen, RotateCw } from 'lucide-react';

/**
 * Componente para la pantalla final del quiz, mostrando el puntaje y un mensaje.
 *
 * @param {object} props - Propiedades del componente.
 * @param {number} props.puntaje - Puntaje final obtenido por el usuario.
 * @param {number} props.totalPreguntas - Número total de preguntas en el quiz.
 * @param {function} props.onReiniciar - Función de callback para reiniciar el quiz.
 */
export function Results({ puntaje, totalPreguntas, onReiniciar }) {
  // Calcular el porcentaje de respuestas correctas
  const porcentaje = Math.round((puntaje / totalPreguntas) * 100);
  let mensaje = "";

  // Determinar el mensaje final basado en el porcentaje
  if (porcentaje >= 75) {
  mensaje = (
    <span>
      ¡Excelente! <Trophy size={35} />
    </span>
  );
} else if (porcentaje >= 50) {
  mensaje = (
    <span>
      ¡Bien hecho! <ThumbsUp size={35} />
    </span>
  );
} else {
  mensaje = (
    <span>
      Sigue practicando <BookOpen size={35} />
    </span>
  );
}

  return (
    <div className="final-screen"> {/* Usa la clase CSS */}
      <h1 className="final-title">Quiz Finalizado</h1>
      <h2 className="final-message">{mensaje}</h2>
      <p className="final-score">
        Puntaje final: <strong>{puntaje} / {totalPreguntas}</strong> ({porcentaje}%)
      </p>

      {/* 🎖 Medallero 3D */}
  <div style={{ margin: "2rem 0" }}>
    <MedalleroCanvas />
  </div>
  
      <button
        onClick={onReiniciar}
        className="restart-button" // Usa la clase CSS
        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} // Efecto hover
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"} // Efecto hover
      >
        <RotateCw size={25} className="icon" />
        Reintentar
      </button>
    </div>
  );
}
