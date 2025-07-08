import { Environment } from '@react-three/drei'
import Title from '../texts/Title'
import TextHtml from '../texts/TextHtml';
import { EffectComposer, DepthOfField, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const SceneCloudy = () => {
  return (
    <group>
      {/* <TextHtml scaleX={-1} posX={1.1} posY={1.4} posZ={0.9} /> */}
      <Title title={"Sin tratamiento"} posY={0.5} posZ={1.5} />
      <Environment preset="park" background />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.015} 
          focalLength={0.015}   
          bokehScale={1.5}       
          height={480}
        />

        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.3}       
          luminanceThreshold={0.4}
          luminanceSmoothing={0.1}
        />

        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.003, 0.003]}  
        />
      </EffectComposer>

    </group>
  )
}

export default SceneCloudy;