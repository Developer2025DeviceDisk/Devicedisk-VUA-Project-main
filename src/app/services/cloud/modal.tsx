"use client";
import React, { useEffect, useRef } from "react";
import {
  useGLTF,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAssets } from "@/contexts/AssetProvider";

export const CloudModel = ({ ref }: any) => {
  const { nodes } = useGLTF("/3D/Csloud-op.glb");
  const { setCloudLoaded } = useAssets();
  const { viewport } = useThree();
  const torus = useRef(null);

  const { invalidate } = useThree();
  const isDesktop = useMediaQuery("min-width", 920) as any;

  useEffect(() => {
    invalidate();
  }, [isDesktop]);

    // Notify that Cloud component is loaded when nodes are available
  useEffect(() => {
    if (nodes && Object.keys(nodes).length > 0) {
      setCloudLoaded(true);
    }
  }, [nodes, setCloudLoaded]);

  // Static properties for when controls are disabled
  const staticProps = {
    // Physical material properties for glassy look with better performance
    transparent: true,
    opacity: 0.5,
    roughness: 0.2,
    metalness: 0.0,
    transmission: 1.0,
    thickness: 0.2,
    ior: 1.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: "#ffffff",
    side: THREE.DoubleSide,
    scale:  isDesktop? 1.26 :1.56 * 1.7  ,
    rotationX: 348,
    rotationY: 100,
    rotationZ: 360,
    positionX: 0.2,
    positionY: -4,
    positionZ: 2.0,
    // Text 1 (BOUNDLESS) static properties
    text1PosX: -2,
    text1PosY: 0.6,
    text1PosZ: -2,
    text1RotX: 0,
    text1RotY: 45,
    text1RotZ: 0,
    text1FontSize: 0.8,
    text1Color: "#ffffff",
    // Text 2 (CREATIVITY) static properties
    text2PosX: -2,
    text2PosY: -0.1,
    text2PosZ: -2,
    text2RotX: 0,
    text2RotY: 45,
    text2RotZ: 0,
    text2FontSize: 0.8,
    text2Color: "#ffffff",
  };


  const controlsProps = staticProps;

  // Choose between static or controls based on the toggle
  const materialProps = controlsProps;

  useEffect(() => {
    if (torus.current) {
      if (ref) ref.current = torus.current;

      // Apply rotation from Leva controls
      //   @ts-ignore
      torus.current.rotation.set(
        THREE.MathUtils.degToRad(materialProps.rotationX),
        THREE.MathUtils.degToRad(materialProps.rotationY),
        THREE.MathUtils.degToRad(materialProps.rotationZ)
      );
    }
  }, [
    materialProps.rotationX,
    materialProps.rotationY,
    materialProps.rotationZ,
  ]);

  return (
    <group         scale={controlsProps.scale * (viewport.width / 3.75)}>
      <mesh
        ref={torus}
        {...nodes.Cloud}
        scale={0.08 * materialProps.scale}
        position={[
          materialProps.positionX,
          materialProps.positionY,
          materialProps.positionZ,
        ]}
      >
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
    </group>
  );
};
