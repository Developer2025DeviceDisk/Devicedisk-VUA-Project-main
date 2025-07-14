"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { GlassModel } from "./Modal";

export const RingScene = ({ ...props }) => {
  return (
    <Canvas
      style={{ background: "#6310FF" }}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [2, 0, 2], fov: 50 }}
    >
      <color attach="background" args={["#6310FF"]} />
      <GlassModel {...props} />
      <Environment preset="sunset" backgroundRotation={[1,3,3]} />
    </Canvas>
  );
};
 