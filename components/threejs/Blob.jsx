import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useCallback } from "react";
import { MathUtils, Color } from "three";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";

const Blob = ({ isClicked }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: { value: 0.3 },
      u_time: { value: 0.0 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    const targetIntensity = isHovered || isClicked ? 0.4 : 0.04;
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      targetIntensity,
      0.01
    );
  });

  // Event handlers using useCallback for performance optimization
  const handlePointerOver = useCallback(() => setIsHovered(true), []);
  const handlePointerOut = useCallback(() => setIsHovered(false), []);

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const BlobScene = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handlePointerDown = useCallback(() => setIsClicked(true), []);
  const handlePointerUp = useCallback(() => setIsClicked(false), []);

  return (
    <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      <Blob isClicked={isClicked} />
      <axesHelper />
      <OrbitControls
        onStart={handlePointerDown}
        onEnd={handlePointerUp}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
      />
    </Canvas>
  );
};

export default BlobScene;
