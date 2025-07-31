"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { GlassModel } from "./Modal";
import { Suspense } from "react";

export const RingScene = ({ ...props }) => {
  return (
    <Canvas
      style={{ background: "#6310FF" }}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [2, 0, 2], fov: 50 }}
      dpr={1}
      performance={{ min: 0.2 }}
    >
      <color attach="background" args={["#6310FF"]} />
      <GlassModel {...props} />
             <Suspense fallback={null}>
      <Environment files="/hdri/sunset_small_03_1k.hdr" backgroundRotation={[1, 3, 3]} />
      </Suspense>
    </Canvas>
  );
};
