import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const WarpStars = () => {
  const points = useRef();
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    const cols = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 100; // Deep Z
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.8); // Plasma blue hues
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);



  return (
    <Points ref={points} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Nebula = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[10, -5, -20]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} wireframe />
      </mesh>
      <mesh position={[-15, 10, -30]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.03} />
      </mesh>
    </Float>
  );
};

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-void">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#00000a"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0} 
        />
        
        <WarpStars />
        <Nebula />
        
        <fog attach="fog" args={["#00000a", 10, 50]} />
      </Canvas>
    </div>
  );
}
