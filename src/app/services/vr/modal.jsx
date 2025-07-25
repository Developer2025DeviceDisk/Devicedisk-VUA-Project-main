"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAssets } from "@/contexts/AssetProvider";

export const VRModel = ({ vrGroupRef: groupRef, vrOne: modelRef }) => {
  const { nodes, scene } = useGLTF("/3D/vr-vr-client.glb");
  const { viewport } = useThree();
  const { setVrLoaded } = useAssets();
  const { invalidate } = useThree();

  const isDesktop = useMediaQuery("min-width", 920);

  useEffect(() => {
    if (isDesktop === undefined) return;
    invalidate();
  }, [isDesktop]);

  useEffect(() => {
    if (nodes && Object.keys(nodes).length > 0) {
      setVrLoaded(true);
    }
  }, [nodes, setVrLoaded]);

  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      window.location.reload();
    };

    gl.domElement.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, [gl]);

  // Static properties for when controls are disabled
  const staticTransformProps = {
    scale: 0.11,
    rotationX: 0,
    rotationY: -134,
    rotationZ: 0,
  };

  const staticPositionProps = {
    positionX: 0,
    positionY: -0.15,
    positionZ: -0.3,
  };

  const staticGroupProps = {
    groupPositionX: 0,
    groupPositionY: isDesktop ? 0 : 0.37,
    groupPositionZ: 0.0,
    groupScale: isDesktop ? 0.6 : 1,
    groupRotationX: 0,
    groupRotationY: 0,
    groupRotationZ: 0,
  };

  // Model transform controls
  const transformControls = staticTransformProps;

  // Model position controls
  const positionControls = staticPositionProps;

  // Group position controls
  const groupControls = staticGroupProps;

  return (
    <>
      {/* Main VR Group */}
      <group
        ref={groupRef}
        position={[0, staticGroupProps.groupPositionY, 0]}
        scale={groupControls.groupScale * (viewport.width / 3.75)}
      >
        {/* VR model with original materials */}
        <primitive
          scale={transformControls.scale}
          rotation={[
            THREE.MathUtils.degToRad(transformControls.rotationX),
            THREE.MathUtils.degToRad(transformControls.rotationY),
            THREE.MathUtils.degToRad(transformControls.rotationZ),
          ]}
          position={[
            positionControls.positionX,
            positionControls.positionY,
            positionControls.positionZ,
          ]}
          ref={modelRef}
          object={scene}
        />
      </group>
    </>
  );
};
