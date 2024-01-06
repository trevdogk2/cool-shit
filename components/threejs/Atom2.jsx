"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import * as THREE from "three";
import useInterval from "@/app/customHooks/useInterval";

const ParticleSystem = ({
  mesh,
  particleCount,
  isElectron = false,
  spin = false,
  orbitRadius = 150,
  speed = 1,
  orbitPlane = "xy",
  offset = 0,
  color,
}) => {
  const particleMesh = useRef();
  const [particles, setParticles] = useState();
  const texture = useTexture("particle-texture.jpg");
  const [accumulatedDistance, setAccumulatedDistance] = useState(0);
  let lastTime = useRef(0);

  useEffect(() => {
    if (mesh) {
      const sampler = new MeshSurfaceSampler(mesh).build();
      const tempParticles = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const position = new THREE.Vector3();
        sampler.sample(position);
        tempParticles.set([position.x, position.y, position.z], i * 3);
      }
      setParticles(tempParticles);
    }
  }, [mesh, particleCount]);

  useFrame(({ clock }) => {
    if (isElectron && particleMesh.current) {
      particleMesh.current.rotation.y += speed / 50;
      particleMesh.current.rotation.z += speed / 50;
    }
    if (spin && particleMesh.current) {
      particleMesh.current.rotation.y += 0.0;
    }
    if (isElectron && particleMesh.current) {
      // const t = clock.getElapsedTime() * speed + offset;
      // Calculate time delta
      const currentTime = clock.getElapsedTime();
      const deltaTime = currentTime - lastTime.current;
      lastTime.current = currentTime;

      // Update accumulated distance
      const distanceIncrement = deltaTime * speed;
      setAccumulatedDistance((prevDistance) => prevDistance + distanceIncrement);

      // Use accumulatedDistance for positioning
      const t = accumulatedDistance + offset;

      switch (orbitPlane) {
        case "xy":
          particleMesh.current.position.x = Math.sin(t) * orbitRadius;
          particleMesh.current.position.z = Math.cos(t) * orbitRadius;
          break;
        case "diagonal-asc":
          particleMesh.current.position.x = Math.sin(t) * orbitRadius;
          particleMesh.current.position.y = Math.cos(t) * orbitRadius * Math.sin(Math.PI / 4);
          particleMesh.current.position.z = Math.cos(t) * orbitRadius * Math.cos(Math.PI / 4);
          break;
        case "diagonal-desc":
          particleMesh.current.position.x = Math.sin(t) * orbitRadius;
          particleMesh.current.position.y = Math.cos(t) * orbitRadius * Math.sin(-Math.PI / 4);
          particleMesh.current.position.z = Math.cos(t) * orbitRadius * Math.cos(-Math.PI / 4);
          break;
        default:
        // Handle default case or throw an error
      }
    }
  });

  if (!particles) return null;

  return (
    <points
      ref={particleMesh}
      geometry={new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(particles, 3))}
    >
      <pointsMaterial
        size={3} // Increase size when hovered
        color={color}
        transparent
        opacity={1}
        depthWrite={false}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
        alphaMap={texture}
      />
    </points>
  );
};

const TorusOrbit = ({ radius, rotation, color }) => {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.2, 50, 100]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  );
};

export default function Atom2({ primaryColor = "ffffff", secondaryColor = "#61dbfb", lineColor = "#61dbfb" }) {
  const radius = 100;
  const nucleusRef = useRef();
  const electron1Ref = useRef();
  const electron2Ref = useRef();
  const electron3Ref = useRef();
  const [isMeshReady, setIsMeshReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useInterval(
    () => {
      if (nucleusRef.current && electron1Ref.current && electron2Ref.current && electron3Ref.current) {
        setIsMeshReady(true);
      }
    },
    isMeshReady ? null : 100
  );

  return (
    <Canvas
      camera={{ position: [120, 75, 175] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <mesh ref={nucleusRef} visible={false}>
        <sphereGeometry args={[40, 20, 20]} />
        <meshNormalMaterial />
      </mesh>
      <mesh ref={electron1Ref} position={[-radius, radius, 0]} visible={false}>
        <sphereGeometry args={[10, 20, 20]} />
        <meshNormalMaterial />
      </mesh>
      <mesh ref={electron2Ref} position={[radius, -radius, 0]} visible={false}>
        <sphereGeometry args={[10, 20, 20]} />
        <meshNormalMaterial />
      </mesh>
      <mesh ref={electron3Ref} position={[0, 0, radius]} visible={false}>
        <sphereGeometry args={[10, 20, 20]} />
        <meshNormalMaterial />
      </mesh>
      <TorusOrbit radius={radius} rotation={[Math.PI / 2, 0, 0]} color={lineColor} />
      <TorusOrbit radius={radius} rotation={[Math.PI / 4, 0, 0]} color={lineColor} />
      <TorusOrbit radius={radius} rotation={[Math.PI / -4, 0, 0]} color={lineColor} />

      {isMeshReady && (
        <>
          <ParticleSystem
            mesh={nucleusRef.current}
            particleCount={10000}
            color={isHovered ? secondaryColor : primaryColor}
          />
          <ParticleSystem
            mesh={electron1Ref.current}
            particleCount={1000}
            isElectron
            orbitRadius={radius}
            speed={isHovered ? 0.5 : 1.5}
            orbitPlane="xy"
            color={isHovered ? secondaryColor : primaryColor}
          />
          <ParticleSystem
            mesh={electron2Ref.current}
            particleCount={1000}
            isElectron
            orbitRadius={radius}
            speed={isHovered ? 0.75 : 2.25}
            orbitPlane="diagonal-asc"
            offset={(2 * Math.PI) / 3}
            color={isHovered ? secondaryColor : primaryColor}
          />
          <ParticleSystem
            mesh={electron3Ref.current}
            particleCount={1000}
            isElectron
            orbitRadius={radius}
            speed={isHovered ? 1 : 3}
            orbitPlane="diagonal-desc"
            offset={(4 * Math.PI) / 3}
            color={isHovered ? secondaryColor : primaryColor}
          />
        </>
      )}
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={isHovered ? 0.5 : 2}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        zoomToCursor={true}
      />
    </Canvas>
  );
}
