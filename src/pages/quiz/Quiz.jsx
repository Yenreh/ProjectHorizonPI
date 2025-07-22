import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Option } from './Option'; // Importar el componente Opcion
import { Environment3D, Suelo, Paredes } from './Environment3D'; // Importar componentes visuales y físicos
import { BolaArrastrable, BolaImpulso, BolaCatapulta, SistemaBowling } from './Mechanics'; // Importar todas las mecánicas
import { Results } from './Results'; // Importar el componente QuizFinal
import './Quiz.css'; // Importar el archivo CSS

// Botón flotante para reiniciar solo la posición de la bola
function InfoButton({ onClick }) {
  return (
    <button className="quiz-reset-btn" title="Reiniciar posición de la bola" onClick={onClick}>
      <span role="img" aria-label="reset">🔄</span>
    </button>
  );
}

// Datos del quiz (preguntas y sus propiedades)
const preguntas = [
  {
    texto: "¿Qué parte del ojo se vuelve opaca en las cataratas?",
    opciones: ["Retina", "Cristalino", "Córnea", "Iris"],
    correcta: "Cristalino",
    mecanica: "arrastrar",
    color: "#3b82f6",
    instruccion: "Arrastra la bola azul hacia la opción correcta"
  },
  {
    texto: "¿Cuál es un síntoma común de la miopía?",
    opciones: [
      "Dificultad para ver de lejos",
      "Ojo rojo",
      "Dolor de cabeza intenso",
      "Visión doble"
    ],
    correcta: "Dificultad para ver de lejos",
    mecanica: "impulso",
    color: "#10b981",
    instruccion: "Haz clic en cualquier lugar para empujar la bola verde hacia adelante"
  },
  {
    texto: "¿Qué síntoma es común en la conjuntivitis?",
    opciones: ["Ojo rojo", "Visión doble", "Dolor de cabeza", "Ceguera súbita"],
    correcta: "Ojo rojo",
    mecanica: "catapulta",
    color: "#ef4444",
    instruccion: "Mantén presionado, apunta y suelta para lanzar la bola roja"
  },
  {
    texto: "¿Qué ocurre en el desprendimiento de retina?",
    opciones: ["La retina se separa", "El iris se inflama", "El cristalino se endurece", "La córnea se opaca"],
    correcta: "La retina se separa",
    mecanica: "bowling",
    color: "#f97316",
    instruccion: "Haz clic para apuntar, luego clic de nuevo para lanzar"
  },
];

/**
 * Componente principal del quiz físico.
 * Gestiona el flujo del quiz, el estado de las preguntas, el puntaje
 * y la renderización de las mecánicas 3D.
 */
export default function QuizPrincipal() {
  // Ref para bloquear múltiples respuestas por pregunta
  const respondidaRef = React.useRef(false);
  const [indice, setIndice] = useState(0); // Índice de la pregunta actual
  const [puntaje, setPuntaje] = useState(0); // Puntaje del usuario
  const [respondida, setRespondida] = useState(false); // Indica si la pregunta actual ya fue respondida
  const [mostrarResultado, setMostrarResultado] = useState(false); // Controla la visibilidad del mensaje de resultado
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(""); // La opción seleccionada por el usuario

  // Obtener la pregunta actual del array de preguntas
  const pregunta = preguntas[indice];

  /**
   * Función para avanzar a la siguiente pregunta o finalizar el quiz.
   * Se llama cuando el usuario selecciona una respuesta.
   *
   * @param {string} respuesta - La etiqueta de la opción seleccionada por el usuario.
   */
  const avanzar = useCallback((respuesta) => {
    if (respondidaRef.current) return;
    respondidaRef.current = true;
    setRespondida(true);
    setRespuestaSeleccionada(respuesta);
    setMostrarResultado(true);

    if (respuesta === pregunta.correcta) {
      setPuntaje(puntajeActual => puntajeActual + 1);
    }

    setTimeout(() => {
      respondidaRef.current = false;
      if (indice < preguntas.length - 1) {
        setIndice(indice + 1);
        setRespondida(false);
        setMostrarResultado(false);
        setRespuestaSeleccionada("");
      } else {
        setIndice(preguntas.length);
      }
    }, 3000);
  }, [indice, pregunta?.correcta]);

  /**
   * Función para reiniciar el quiz desde el principio.
   */
  const reiniciar = useCallback(() => {
    setIndice(0);
    setPuntaje(0);
    setRespondida(false);
    setMostrarResultado(false);
    setRespuestaSeleccionada("");
  }, []);

  // Estado y función para reiniciar la posición de la bola actual
  const [resetBolaFlag, setResetBolaFlag] = useState(false);
  const resetBola = useCallback(() => {
    setResetBolaFlag(flag => !flag);
  }, []);

  // Si todas las preguntas han sido respondidas, mostrar la pantalla final
  if (indice >= preguntas.length) {
    return (
      <Results
        puntaje={puntaje}
        totalPreguntas={preguntas.length}
        onReiniciar={reiniciar}
      />
    );
  }

  const getComponenteMecanica = () => {
    const props = {
      respondida,
      color: pregunta.color,
      preguntaIndex: indice,
      resetBolaFlag
    };
    switch (pregunta.mecanica) {
      case "arrastrar": return <BolaArrastrable {...props} />;
      case "impulso": return <BolaImpulso {...props} />;
      case "catapulta": return <BolaCatapulta {...props} />;
      case "bowling": return <SistemaBowling {...props} />;
      default: return <BolaArrastrable {...props} />;
    }
  };

  return (
    <div className="quiz-container"> {/* Usa la clase CSS */}
      {/* Encabezado del quiz */}
      <div className="quiz-header"> {/* Usa la clase CSS */}
        <div className="quiz-header-content"> {/* Usa la clase CSS */}
          <h2 className="quiz-title">{pregunta.texto}</h2> {/* Usa la clase CSS */}
          <div className="quiz-stats"> {/* Usa la clase CSS */}
            <span>Pregunta: {indice + 1}/{preguntas.length}</span>
            <span>Puntaje: {puntaje}</span>
          </div>
        </div>
        <p className={`quiz-instruction ${respondida ? "responded" : "pending"}`}> {/* Usa la clase CSS condicionalmente */}
          {respondida ? "¡Respuesta registrada!" : pregunta.instruccion}
        </p>
      </div>

      {/* Mensaje de resultado centrado */}
      {mostrarResultado && (
        <div className={`quiz-result-center ${respuestaSeleccionada === pregunta.correcta ? "correct" : "incorrect"}`}>
          <h3 className="quiz-result-title">
            {respuestaSeleccionada === pregunta.correcta ? "¡CORRECTO! ✅" : "INCORRECTO ❌"}
          </h3>
          <p className="quiz-result-text">
            Respuesta correcta: <strong>{pregunta.correcta}</strong>
          </p>
        </div>
      )}

      {/* Canvas 3D para la simulación física */}
      <Canvas
        key={`pregunta-${indice}`}
        shadows
        camera={{ position: [0, 8, 12], fov: 60 }}
        style={{ height: "100%" }}
      >
        <Environment3D />
        <Physics gravity={[0, -12, 0]} debug={false}>
          <Suelo />
          <Paredes />
          {getComponenteMecanica()}
          {pregunta.opciones.map((opcion, i) => (
            <Option
              key={`${indice}-${opcion}-${i}`}
              label={opcion}
              position={[i * 4 - 6, 2, -4]}
              isCorrect={opcion === pregunta.correcta}
              showResult={mostrarResultado && respuestaSeleccionada === opcion}
              onHit={avanzar}
              preguntaIndex={indice}
              respondida={respondida}
            />
          ))}
        </Physics>
      </Canvas>

      {/* Botón flotante para reiniciar solo la posición de la bola */}
      <InfoButton onClick={resetBola} />
    </div>
  );
}
