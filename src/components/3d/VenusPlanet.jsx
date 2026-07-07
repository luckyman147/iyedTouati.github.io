import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { getActiveIdx } from "./planetScroll";

// Same slot the procedural "Projects" planet used to occupy (see Scene.jsx PLANETS[1]).
const PLANET_INDEX = 1;
const xF = 0.14, yF = 0.52, rF = 0.12;

function VenusMesh() {
  const groupRef = useRef();
  const obj = useLoader(OBJLoader, "/venus/Venus_1K.obj");
  const [diffuse, bump, atmosphere] = useLoader(THREE.TextureLoader, [
    "/venus/Textures/Diffuse_1K.png",
    "/venus/Textures/Bump_1K.png",
    "/venus/Textures/Atmosphere_2K.png",
  ]);

  useEffect(() => {
    obj.children.forEach((group) => {
      const isAtmosphere = group.name === "Atmosphere";
      group.traverse((child) => {
        if (!child.isMesh) return;
        child.material = isAtmosphere
          ? new THREE.MeshStandardMaterial({
              map: atmosphere,
              transparent: true,
              depthWrite: false,
              side: THREE.FrontSide,
            })
          : new THREE.MeshStandardMaterial({
              map: diffuse,
              bumpMap: bump,
              bumpScale: 0.015,
              color: new THREE.Color(0xe8cd9a),
            });
      });
    });
  }, [obj, diffuse, bump, atmosphere]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.09;
  });

  return <primitive ref={groupRef} object={obj} />;
}

export default function VenusPlanet() {
  const wrapRef = useRef(null);
  const [box, setBox] = useState({ left: 0, top: 0, size: 0 });

  useEffect(() => {
    const resize = () => {
      const W = window.innerWidth, H = window.innerHeight;
      const r = rF * Math.min(W, H) * 1.5; // include atmosphere/glow margin
      setBox({ left: xF * W - r, top: yF * H - r, size: r * 2 });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    let animId;
    let smoothIdx = 0;
    const tick = () => {
      const activeIdx = getActiveIdx();
      smoothIdx += (activeIdx - smoothIdx) * 0.032;
      const opacity = Math.max(0, Math.min(1, 1 - Math.abs(smoothIdx - PLANET_INDEX)));
      if (wrapRef.current) wrapRef.current.style.opacity = opacity;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        left: box.left,
        top: box.top,
        width: box.size,
        height: box.size,
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 2.6], fov: 32 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[-2.5, 1.2, 2]} intensity={2.1} />
        <React.Suspense fallback={null}>
          <VenusMesh />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
