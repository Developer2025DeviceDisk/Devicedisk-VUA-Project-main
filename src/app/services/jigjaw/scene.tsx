"use client";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
} from "@react-three/drei";
import { JigJawModel } from "./modal";
import { Suspense } from "react";

export const SceneJigJaw = ({ ...props }: any) => {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [2, 0, 2], fov: 50 }}
      style={{
        background: "#6210ff",
      }}
      dpr={1}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={["#6210ff"]} />
      <JigJawModel {...props} />
      <ambientLight intensity={1} position={[1, 4, 10]} />
      {/* @ts-ignore */}
       <Suspense fallback={null}>
      <Environment files="/hdri/sunset_small_03_1k.hdr" environmentRotation={[1, 2, 1]} />
      </Suspense>
    </Canvas>
  );
};
