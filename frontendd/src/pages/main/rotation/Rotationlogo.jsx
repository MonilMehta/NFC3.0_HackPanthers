import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Model = ({ onHover }) => {
  const { scene } = useGLTF('/main.glb'); // Ensure the path is correct
  return (
    <primitive 
      object={scene}
      scale={1}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    />
  );
};

const Rotationlogo = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div style={{ 
      width: '500px', 
      height: '500px', 
      background: '#003E1F', 
      margin: 'auto',
      borderRadius: '300px', // Adjusted for oval shape
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        width: '500px', 
        height: '500px', 
        borderRadius: '250px' // Inner container adjusted
      }}>
        <Canvas style={{ width: '100%', height: '100%' }}>
          <React.Suspense fallback={null}>
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />
            
            {/* Directional Light */}
            <directionalLight position={[10, 10, 5]} intensity={3} />
                      
            {/* Point Light */}
            <pointLight position={[-10, -10, 10]} intensity={0.5} />
            
            {/* Spotlight Above the Model */}
            <spotLight 
              position={[0, 5, 0]}
              angle={0.2}
              penumbra={1}
              intensity={3}
              castShadow
              distance={10}
              decay={2}
            />
            
            {/* Model with Hover Detection */}
            <Model onHover={setHovered} />
                      
            {/* OrbitControls with restricted zoom and pan */}
            <OrbitControls 
              autoRotate
              enableZoom={false} // Disable zoom
              enablePan={false}  // Disable pan
              enableRotate={true} // Enable rotation
            />
            
            {/* Conditional Bloom Effect */}
            {hovered && (
              <EffectComposer>
                <Bloom
                  luminanceThreshold={0.1}
                  luminanceSmoothing={0.9}
                  intensity={7}
                />
              </EffectComposer>
            )}
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Rotationlogo;