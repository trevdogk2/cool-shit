import React from "react";

export default function Floor(props) {
  return (
    <mesh {...props} recieveShadow>
      <boxGeometry args={[20, 0.1, 20]} />
      <meshPhysicalMaterial color="purple" />
    </mesh>
  );
}
