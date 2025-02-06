import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

const GameBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      <Stars 
        radius={300} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
      />
      <mesh ref={meshRef}>
        <sphereGeometry args={[100, 64, 64]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.7} 
          metalness={0.3} 
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
    </group>
  );
};

const GameEnvironment: React.FC = () => {
  return (
    <Canvas 
      camera={{ 
        position: [0, 0, 200], 
        fov: 75 
      }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 
      }}
    >
      <Suspense fallback={null}>
        <GameBackground />
        <OrbitControls />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

export default GameEnvironment;
