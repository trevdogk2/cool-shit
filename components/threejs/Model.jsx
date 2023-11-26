import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import * as THREE from "three";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/html.glb");
  const texture = useTexture("particle-texture.jpg");

  const particles = useMemo(() => {
    if (!gltf.scene.children.length) {
      return null;
    }

    const mesh = gltf.scene.children.find((child) => child.isMesh);
    if (!mesh) {
      console.warn("No mesh found in GLTF model");
      return null;
    }

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sampler = new MeshSurfaceSampler(mesh).build();

    for (let i = 0; i < 20000; i++) {
      const position = new THREE.Vector3();
      sampler.sample(position);
      vertices.push(position.x, position.y, position.z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [gltf]);

  if (!particles) {
    return null;
  }

  return (
    <points geometry={particles}>
      <pointsMaterial
        size={0.005}
        color={"#ff0000"}
        transparent
        opacity={0.75}
        depthWrite={false}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
        alphaMap={texture}
      />
    </points>
  );
};

export default Model;
