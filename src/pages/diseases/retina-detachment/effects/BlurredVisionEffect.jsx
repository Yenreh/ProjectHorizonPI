// BlurredVisionEffect.jsx
import React from 'react';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

export default function BlurredVisionEffect({
  focusDistance = 0.0,    // Distancia a la que enfocaría la "lente". Si es 0, todo se desenfoca más.
  focalLength = 0.02,     // Longitud focal de la "lente". Valores más pequeños tienden a desenfocar más.
  bokehScale = 5.0,       // Intensidad del desenfoque (tamaño del bokeh).
  // width y height se toman automáticamente del viewport, no es necesario pasarlos.
}) {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={focusDistance} // Distancia en la que la imagen estaría enfocada (unidades del mundo)
        focalLength={focalLength}     // Longitud focal de la lente virtual (0.0 a 1.0)
        bokehScale={bokehScale}       // Escala del efecto bokeh (qué tan grande es el desenfoque)
        height={480}                  // Altura del búfer de renderizado para el efecto (puede afectar el rendimiento/calidad)
                                      // Es mejor dejarlo en valores moderados o no definirlo para que use el default.
                                      // El valor por defecto es 480, pero podemos ajustarlo.
      />
    </EffectComposer>
  );
}