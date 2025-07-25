"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { VRModel } from "./modal";
import { Environment } from "@react-three/drei";

export const VRScene = ({ vrOneRef, vrGroupRef, vrModalContainer }) => {
  return (
    <div className="w-full h-screen z-[3] relative" ref={vrModalContainer}>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [2, 0, 2], fov: 50 }}
        dpr={1}
        performance={{ min: 0.2 }}
      >
        <Environment preset="studio" />
        <VRModel vrGroupRef={vrGroupRef} vrOne={vrOneRef} />
      </Canvas>
    </div>
  );
};
