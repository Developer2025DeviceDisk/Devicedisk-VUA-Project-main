"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { CloudModel } from "./modal";

export const SceneCloud = ({ modalRef }: any) => {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [2, 0, 2], fov: 50 }}
      style={{
        background: "#6210ff",
      }} 
      dpr={1} // Force 1x pixel ratio
      performance={{ min: 0.2 }}
    >

      <color attach="background" args={["#6210ff"]} />
      <CloudModel ref={modalRef} />
      <ambientLight intensity={1} position={[1, 4, 10]} />
      <Environment preset="city" environmentRotation={[0, 2, 2]} />
    </Canvas>
  );
};
