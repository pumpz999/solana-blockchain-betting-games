import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Effects } from '@react-three/drei';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three-stdlib';

const CyberGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.1;
      meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <gridHelper args={[100, 50, '#00ffff', '#ff00ff']} />
        <meshStandardMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.2} 
          wireframe 
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
};

const CyberBackground: React.FC = () => {
  return (
    <Canvas 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1 
      }}
      camera={{ position: [0, 5, 20], fov: 75 }}
    >
      <CyberGrid />
      <Stars 
        radius={300} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
      />
      <OrbitControls enableZoom={false} />
      <Effects>
        <UnrealBloomPass strength={0.5} radius={0.5} threshold={0.1} />
      </Effects>
    </Canvas>
  );
};

export default CyberBackground;
